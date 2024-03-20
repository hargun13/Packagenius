import React, { useState } from 'react'
import 'C:/Users/HARGUN/Desktop/Packagenius/packagenius-frontend/src/Dashboard/Design/BotInterface/Chat.css'
import img from './packagenius-logo.png'
import { PiSparkleFill } from "react-icons/pi";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDesignLoadContext } from './DesignLoadingContext';


const Chat = () => {

    const { loading, setLoading } = useDesignLoadContext()
    const person = 'https://production.listennotes.com/podcasts/iman-gadzhi-iman-gadzhi-community-fZ4P2URCEqo-9Wd3CqxbnLp.300x300.jpg'

    const [inputText, setInputText] = useState('');

    const formatDate = (date) => {
      const h = `0${date.getHours()}`;
      const m = `0${date.getMinutes()}`;
      return `${h.slice(-2)}:${m.slice(-2)}`;
    };
    const [messages, setMessages] = useState([
      {
        name: 'PackageBot',
        img: img,
        side: 'left',
        text: 'Welcome to PackageBot, let us know the design you are looking for and we shall make it right away!',
        time: formatDate(new Date()),
      },
    ]);
  
    const appendMessage = (name, img, side, text) => {
      const updatedMessages = [...messages, {
        name,
        img,
        side,
        text,
        time: formatDate(new Date()),
      }];
      setMessages(updatedMessages);
    };
  
    const botResponse = async (rawText) => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/process_prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: rawText }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        const dielineImageLink = data.dieline_image_link;
        const mockupImageLink = data.mockup_image_link;
        const sustainableMaterials = data.materials;
        console.log(dielineImageLink, mockupImageLink)
        setLoading(false)

        setMessages((prevMessages) => [
          ...prevMessages,
          { name: 'PackageBot', img: img, side: 'left', text: "Here is the design you asked for:", mockup: mockupImageLink, dieline: dielineImageLink , materials: sustainableMaterials ,time: formatDate(new Date()) },
        ]);
        toast.info('You will be sent an Email, once your 3D Model is rendered', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });
      } catch (error) {
        console.error('Error fetching bot response:', error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputText) return;

        appendMessage('You', person , 'left', inputText);
        setInputText('');
        await botResponse(inputText);
    };

  return (
    <div className="msger">
      <main className="msger-chat scrollbar-hide">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.side}-msg`}>
            <div className="msg-img rounded-xl h-[40px] w-[40px]" style={{ backgroundImage: `url(${msg.img})` }}>
            </div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{msg.name}</div>
                <div className="msg-info-time text-sm lg:text-normal">{msg.time}</div>
              </div>
              <div className="msg-text text-sm lg:text-normal">{msg.text}</div>
              <div className='flex items-center justify-between '>
                {msg.dieline && !loading && <img src={msg.dieline} alt={`dieline ${index}`} className='h-[450px] w-[45%]'/>}
                {msg.mockup && !loading && <img src={msg.mockup} alt={`mockup ${index}`} className='h-[450px] w-[45%]'/>}
              </div>
              {msg.materials &&
              <div>
                <p>Our Advice on Sustainable Packaging: </p>
                <p>{msg.materials}</p>
              </div>
              }
            </div>
          </div>
        ))}
      </main>
      
      <form onSubmit={handleSubmit} className='p-5'>
          <div className="w-full border border-gray-600 rounded-lg bg-transparent ">
              <div className="px-4 py-2 rounded-t-lg">
                  <textarea id="comment" rows="2" className="resize-none w-full px-0 text-sm text-gray-200 bg-transparent focus:outline-none" placeholder="Describe your design" required 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}/>
              </div>
              <div className="flex items-center justify-end px-3 py-2 ">
                  <button type="submit" className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg gap-2">
                      <PiSparkleFill />Generate
                  </button>
              </div>
          </div>
      </form>

      <ToastContainer />

    </div>
  )
}

export default Chat