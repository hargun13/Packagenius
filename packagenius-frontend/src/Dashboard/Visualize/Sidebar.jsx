import React, { useState, useEffect } from 'react';
import { useDrawer } from './DrawerContext';
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const { closeDrawer, isDrawerOpen } = useDrawer();
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState('')
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
      const handleResize = () => {
          setIsMobileView(window.innerWidth <= 1024); // Adjust the breakpoint as per your design
      };

      handleResize(); // Check on component mount
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://127.0.0.1:5000/getChatData')
      .then(response => response.json())
      .then(data => {
        if (data.chats) {
          setChats(data.chats);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
    }
  , []); // Empty dependency array ensures the effect runs only once

  console.log(chats)
  const fetchModel = (chat) => {
    // Construct request data

    fetch('http://127.0.0.1:5000/dashboard')
      .then(response => response.json())
      .then(data => {
        if (data.user_data) {
          setUser(data.user_data.userId);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
    
    console.log(user, chat.id, chat.mockup_image_link)
    const requestData = {
      user_id: user, // Provide user ID
      response_id: chat.id, // Assuming response_id exists in chat data
      url: chat.mockup_image_link // Assuming URL exists in chat data
    };

    // // Make POST request to fetch model data
    // fetch('http://127.0.0.1:5000/get_model', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestData)
    // })
    // .then(response => response.json())
    // .then(modelData => {
    //   console.log('Model Data:', modelData);
    //   // Handle model data as needed
    // })
    // .catch(error => console.error('Error fetching model data:', error));

    // Make POST request to fetch model data
    fetch('http://127.0.0.1:5000/get_model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (response.ok) {
        // If the response is successful, return the response blob
        return response.blob();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(blob => {
      // const file = new File([blob], `${chat.id}.glb`, { type: 'model/gltf-binary' });
    
      // // Create a URL for the file
      // const url = window.URL.createObjectURL(file);
      
      // // Create a link element to trigger the download
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${chat.id}.glb`; // Set the filename as response ID with .glb extension
      // document.body.appendChild(a);
      
      // // Trigger the click event on the link to download the file
      // a.click();
      
      // // Revoke the object URL to free up resources
      // window.URL.revokeObjectURL(url);
      localStorage.setItem('modelBlob', blob);
      console.log(localStorage.getItem('modelBlob'))
    })
    .catch(error => console.error('Error fetching model data:', error));

  };

  if(isMobileView){
    return (
      <div id="drawer-bottom-example" className={` ${isDrawerOpen ? "overflow-y-scroll scrollbar-hide fixed ease-in-out duration-300 h-[90.7%] bottom-0 left-0 right-0" : "fixed ease-in-out duration-300 h-[90.7%] bottom-[-91%] left-0 right-0"} z-40 w-full p-4 overflow-y-scroll scrollbar-hide bg-[#1e1e1e]`} >
        <button onClick={closeDrawer} className='w-full flex items-center justify-end'><MdClose size={25}/></button>

        <div className='w-full flex flex-col items-start justify-start my-5'>
          <p className='text-[#b3b3b3] text-xs font-bold tracking-wider w-full py-2'>Yesterday</p>
          {chats.map((chat, index) => (
            <div key={index} className='flex items-center justify-between w-full hover:bg-[#303030] p-2 rounded-xl'>
              <img src={chat.mockup_image_link} alt='chat-thumbnail' className='h-12 w-14 rounded-xl'/>
              <p className='font-semibold px-3 truncate'>{chat.prompt}</p>
            </div>
          ))}
        </div>

      </div>
    );
  } 
  else{
    return (
      <div className='flex flex-col items-center justify-start w-[20%] h-full p-3 border-r border-r-[#4e4e4e]'>
          <div className='w-full flex flex-col items-start justify-start my-5 overflow-y-scroll scrollbar-hide'>
              <p className='text-[#b3b3b3] text-sm font-bold tracking-wider w-full py-2'>Yesterday</p>

              {chats.map((chat, index) => (
                <div key={index} onClick={() => fetchModel(chat)} className='cursor-pointer flex items-center justify-between w-full hover:bg-[#303030] p-2 rounded-xl'>
                    <img src={chat.mockup_image_link} alt='chat-thumbnail'  className='h-12 w-14 rounded-xl'/>
                    <p className='font-semibold px-3 truncate'>{chat.prompt}</p>
                </div>
              ))}
          </div>
      </div>
    );
  }
};

export default Sidebar;
