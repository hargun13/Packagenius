import google.generativeai as genai
# import requests
# import pandas as pd
import csv
import time


genai.configure(api_key="enter api key here")

def send_to_gemini_api(description):
    
    fixed_prompt = f'''
    I need you to take this input and give me the applications of this item in real life, 
    give the list in comma separated format, just list the applications don't describe it just list it
    use the following prompt: {description}

    you can follow the format of this example response:
    gift,product,mobile phone....
    just list all the possible applications
    '''
    
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(fixed_prompt)
    return response.text

# Path to the input CSV file
input_csv_path = 'C:/Users/HARGUN/Desktop/Packagenius/Scraping Module/scraped_data copy.csv'
# Path to the output CSV file
output_csv_path = 'C:/Users/HARGUN/Desktop/Packagenius/Scraping Module/scraped_data_modified.csv'


def process_csv(input_path, output_path):
    with open(input_path, mode='r', newline='', encoding='utf-8') as infile, \
         open(output_path, mode='w', newline='', encoding='utf-8') as outfile:

        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        # Assuming the first row is the header
        header = next(reader)
        writer.writerow(header)

        for i, row in enumerate(reader, start=1):
            # Send the third column to the Gemini API
            description = row[2]
            api_response = send_to_gemini_api(description)
            # Replace the original description with the API response
            row[2] = api_response

            # Write the modified row to the output CSV
            writer.writerow(row)

            # After every 60 operations, wait for 1 minute
            if i % 60 == 0:
                print(f"Processed {i} rows, pausing for 1 minute...")
                time.sleep(60)

    print("Processing completed.")

process_csv(input_csv_path, output_csv_path)

# Output path for the modified CSV file
print(f"Modified CSV saved to: {output_csv_path}")
