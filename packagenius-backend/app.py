from flask import Flask, request, jsonify, send_file
import requests
import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
from flask_cors import CORS
import uuid
from PIL import Image
import io
import time
import google.generativeai as genai
import os
import tempfile


# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.secret_key = 'rohit0407rai'


# Initialize Firebase app
cred = credentials.Certificate('Enter Certificate path here')
firebase_admin.initialize_app(cred,options={
    'storageBucket': 'Enter bucket link here'
})
db = firestore.client()
bucket = storage.bucket()
mockup_api_url = "https://api-inference.huggingface.co/models/rohit0407rai/product-mockup-generator"
dieline_api_url = "https://api-inference.huggingface.co/models/rohit0407rai/product-dieline-model"
headers = {"Authorization": "Bearer **Enter key**"}
API_KEY = "Enter Meshy API key"
BASE_URL = "https://api.meshy.ai/v1"
# Global variable to store user ID
global_user_id = None


# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    # Get user data from request
    email = request.json['email']
    password = request.json['password']

    try:
        # Create user in Firebase Authentication
        user = auth.create_user(email=email, password=password)

        # Wait for Firebase to return user ID
        auth.get_user(user.uid)

        # Store user data in Firestore
        user_ref = db.collection('users').document(user.uid)
        user_ref.set({
            'email': email,
            'userId': user.uid
            # Add other user data as needed
        })

        return jsonify({'message': 'User registered successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route for user login
@app.route('/signin', methods=['POST'])
def signin():
    # Get email and password from request
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        # Verify user's credentials
        user = auth.get_user_by_email(email)

        # Set global user ID
        global global_user_id
        global_user_id = user.uid

        return jsonify({'message': 'User signed in successfully'}), 200
    except auth.UserNotFoundError:
        return jsonify({'error': 'User not found'}), 404
    except auth.InvalidPasswordError:
        return jsonify({'error': 'Invalid password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route for accessing the user's data
@app.route('/dashboard', methods=['GET'])
def dashboard():
    global global_user_id
    if global_user_id:
        # Retrieve user data from Firestore
        user_ref = db.collection('users').document(global_user_id)
        user_data = user_ref.get().to_dict()

        if user_data:
            return jsonify({'user_data': user_data}), 200
        else:
            return jsonify({'error': 'User data not found'}), 404
    else:
        return jsonify({'error': 'User not logged in'}), 401

def query_api(api_url, payload):
    response = requests.post(api_url, headers=headers, json=payload)
    return response.content

def generate_images(prompt):
    print("I am generating")
    # Generate dieline image
    dieline_image_bytes = query_api(dieline_api_url, {"inputs": f"Make a dieline: {prompt}"})
    dieline_image = Image.open(io.BytesIO(dieline_image_bytes))
    print("banagya")
    
    # Generate mockup image
    mockup_image_bytes = query_api(mockup_api_url, {"inputs": f"Make a mockup: {prompt}"})
    mockup_image = Image.open(io.BytesIO(mockup_image_bytes))

    return dieline_image, mockup_image

@app.route('/process_prompt', methods=['POST'])
def process_prompt():
    # Get prompt from request
    prompt = request.json['prompt']
    print(prompt)
    global global_user_id
    print(global_user_id)


    # Generate images
    dieline_image, mockup_image = generate_images(prompt)

    # # Store images in Firebase Storage
    # user_id = request.json['user_id']
    response_id = str(uuid.uuid4())  # Generate a random response ID
    dieline_image_path = f'{global_user_id}/{response_id}/dieline_image.png'
    mockup_image_path = f'{global_user_id}/{response_id}/mockup_image.png'

    # Upload dieline image
    dieline_blob = bucket.blob(dieline_image_path)
    with io.BytesIO() as dieline_image_stream:
        dieline_image.save(dieline_image_stream, format='PNG')
        dieline_image_stream.seek(0)
        dieline_blob.upload_from_file(dieline_image_stream)

    # Upload mockup image
    mockup_blob = bucket.blob(mockup_image_path)
    with io.BytesIO() as mockup_image_stream:
        mockup_image.save(mockup_image_stream, format='PNG')
        mockup_image_stream.seek(0)
        mockup_blob.upload_from_file(mockup_image_stream)

    # generate the sustainable material list
    instruction = """
    You are a sustainability expert and I need you to list down the possible most sustatainable materials that I should use for the packaging that I am making as per the following description: {prompt}
    The output should be properly structured as a list and don't add any formatting to it please like bold, italic or aanything like that 
    """

    materials = get_gemini_response(instruction)
    materials = materials.replace("**", "")

    # Save image links and prompt to Firestore
    user_ref = db.collection('users').document(global_user_id)
    chat_doc_ref = user_ref.collection('chats').document(response_id)
    chat_doc_ref.set({
        'prompt': prompt,
        'dieline_image_link': dieline_blob.public_url,
        'mockup_image_link': mockup_blob.public_url,
        'materials': materials
    })


    # Return the dieline image link and mockup image link
    return jsonify({
        'dieline_image_link': dieline_blob.public_url,
        'mockup_image_link': mockup_blob.public_url,
        'materials': materials
    }), 200

@app.route('/getChatData', methods=['GET'])
def get_chat_data():
    global global_user_id
    if global_user_id:
        # Retrieve user data from Firestore
        user_ref = db.collection('users').document(global_user_id)
        user_data = user_ref.get().to_dict()

        if user_data:
            # Get all chats for the user
            chats_ref = user_ref.collection('chats').stream()
            # chats_data = [doc.to_dict() for doc in chats_ref]
            chats_data = [{'id': doc.id, **doc.to_dict()} for doc in chats_ref]
            
            return jsonify({'chats': chats_data}), 200
        else:
            return jsonify({'error': 'User data not found'}), 404
    else:
        return jsonify({'error': 'User not logged in'}), 401
    


# @app.route("/generate_model", methods=["POST","GET"])
def generate_model(url, response_id):
    try:
        # Get user ID and response ID from request data
        response_id = response_id
        url = url
        print(response_id)
        print(url)

        # Send image to Meshy AI to generate 3D model
        payload = {
            "image_url": url,
            "enable_pbr": True
        }
        headers = {
            "Authorization": f"Bearer {API_KEY}"
        }
        response = requests.post(f"{BASE_URL}/image-to-3d", headers=headers, json=payload)
        response.raise_for_status()
        task_id = response.json()["result"]

        # Wait for 4-5 minutes before fetching model details
        time.sleep(600)

        # Fetch model details using task ID
        response = requests.get(f"{BASE_URL}/image-to-3d/{task_id}", headers=headers)
        response.raise_for_status()
        model_data = response.json()

        # Get model URL and download the model file
        model_url = model_data["model_url"]
        model_response = requests.get(model_url)
        model_response.raise_for_status()

        # Upload model file to Firebase Storage
        folder_path = f"{global_user_id}/{response_id}/"
        model_id = str(uuid.uuid4()) 
        # blob = bucket.blob(f"{folder_path}{model_id}")
        # blob.upload_from_string(model_response.content)
        blob = bucket.blob(f"{folder_path}{model_id}.glb")
        blob.upload_from_string(model_response.content,content_type="application/octet-stream")

        # Add model URL to response data
        model_data["firebase_storage_url"] = blob.public_url

        # Save model URL in Firestore
        chats_ref = db.collection("users").document(global_user_id).collection("chats").document(response_id)
        chats_ref.set({
            "model_url": blob.public_url
        }, merge=True)  # Merge with existing data if document already exists

        return jsonify(model_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/get_model", methods=["POST"])
def get_model():
    try:
        # Get user ID and response ID from request data
        user_id = request.json.get("user_id")
        print(user_id)
        response_id = request.json.get("response_id")
        print(response_id)
        url = request.json.get("url")
        print(url)

        # Retrieve model URL from Firestore
        model_ref = db.collection("users").document(user_id).collection("chats").document(response_id)
        model_data = model_ref.get().to_dict()

        if model_data:
            model_url = model_data.get("model_url")
            if model_url:
                # Fetch the model file
                model_response = requests.get(model_url)
                model_response.raise_for_status()

                # Save the model file with .glb extension
                with tempfile.NamedTemporaryFile(suffix=".glb", delete=False) as temp_file:
                    temp_file.write(model_response.content)
                    temp_file_path = temp_file.name

                # Rename the temporary file to include .glb extension
                os.rename(temp_file_path, temp_file_path + '.glb')
                temp_file_path += '.glb'

                # Return the model file
                return send_file(temp_file_path, as_attachment=True)
            else:
                # If model URL doesn't exist, generate the model
                return generate_model(url, response_id)
        else:
            # If model data doesn't exist, generate the model
            return generate_model(url, response_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    





genai.configure(api_key="gemini api key here")

def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text


@app.route('/compliance-bot', methods=['POST'])
def get_response():
    data = request.get_json()
    prompt = data['prompt']

    response_text = get_gemini_response(prompt) 
    response_text = response_text.replace("*", "")

    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True)
