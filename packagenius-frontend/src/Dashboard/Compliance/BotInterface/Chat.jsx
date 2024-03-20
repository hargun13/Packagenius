import React, { useState } from 'react'
import './Chat.css';
import img from './packagenius-logo.png'
import { PiSparkleFill } from "react-icons/pi";
import { useComplianceLoadContext } from './ComplianceLoadingContext';


const Chat = () => {

    const { setLoading } = useComplianceLoadContext()
    const person = 'https://production.listennotes.com/podcasts/iman-gadzhi-iman-gadzhi-community-fZ4P2URCEqo-9Wd3CqxbnLp.300x300.jpg'

    const [inputText, setInputText] = useState('');

    const formatDate = (date) => {
      const h = `0${date.getHours()}`;
      const m = `0${date.getMinutes()}`;
      return `${h.slice(-2)}:${m.slice(-2)}`;
    };
    const [messages, setMessages] = useState([
      {
        name: 'TruComply',
        img: img,
        side: 'left',
        text: 'Welcome to TruComply, Ask me Anything regarding your compliance needs!',
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
        const response = await fetch("http://127.0.0.1:5000/compliance-bot", {
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
        const msgText = data.response
        setMessages((prevMessages) => [
          ...prevMessages,
          { name: 'TruComply', img: img, side: 'left', text: msgText,time: formatDate(new Date()) },
        ]);

        setLoading(false)

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
    <div className="msger max-w-[900px]">
      <main className="msger-chat scrollbar-hide">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.side}-msg`}>
            <div className="msg-img rounded-xl" style={{ backgroundImage: `url(${msg.img})` }}>
              {/* <img src={msg.img} /> */}
            </div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{msg.name}</div>
                <div className="msg-info-time">{msg.time}</div>
              </div>
              <div className="msg-text">{msg.text}</div>
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

    </div>
  )
}

export default Chat