import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useDrawer } from './DrawerContext';

const Sidebar = () => {
  const { closeDrawer, isDrawerOpen } = useDrawer();
  const [chats, setChats] = useState([]);
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
  }, []); // Empty dependency array ensures the effect runs only once

    if (isMobileView) {
      return (
        <div id="drawer-bottom-example" className={` ${isDrawerOpen ? "fixed ease-in-out duration-300 h-[90.7%] bottom-0 left-0 right-0 overflow-y-scroll scrollbar-hide" : "fixed ease-in-out duration-300 h-[90.7%] bottom-[-91%] left-0 right-0"} z-40 w-full p-4 overflow-y-scroll scrollbar-hide bg-[#1e1e1e]`} >
          <button onClick={closeDrawer} className='w-full flex items-center justify-end'><MdClose size={25}/></button>

          <div className='bg-[#303030] rounded-lg border border-[#4e4e4e] w-full py-2 flex items-center justify-center text-xs font-bold gap-2 cursor-pointer hover:bg-[#3f3f3f] mt-4'><FaPlus size={10}/>New Design</div>

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
    } else {
      return (
        <div className='hidden lg:flex flex-col items-center justify-start lg:w-[20%] h-full p-3 border-r border-r-[#4e4e4e]'>
          <div className='bg-[#303030] rounded-lg border border-[#4e4e4e] w-full py-2 flex items-center justify-center text-sm font-bold gap-2 cursor-pointer hover:bg-[#3f3f3f]'><FaPlus size={15}/>New Design</div>
          <div className='w-full flex flex-col items-start justify-start my-5 overflow-y-scroll scrollbar-hide'>
            <p className='text-[#b3b3b3] text-sm font-bold tracking-wider w-full py-2'>Yesterday</p>
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

};

export default Sidebar;
