import React from 'react'
import TopBar from './TopBar'
import Chat from './Chat'
import { IoIosList } from "react-icons/io";
import { useDrawer } from '../DrawerContext';

const Main = () => {

  const { openDrawer } = useDrawer();

  return (
      <div className='lg:w-[80%] w-full h-full bg-[#262626]'>
          <TopBar />

          <div className='flex lg:hidden items-center justify-end pt-3 px-3'>
            <IoIosList onClick={openDrawer} size={35} className='bg-[#141414] p-2 rounded'/>
          </div>

          <Chat />
      </div>
  )
}

export default Main