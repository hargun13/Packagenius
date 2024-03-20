import React from 'react'
import TopBar from './TopBar'
import Visualization from './Visualization'
import { IoIosList } from "react-icons/io";
import { useDrawer } from '../DrawerContext';

const Main = () => {

  const { openDrawer } = useDrawer();

  return (
    <div className='lg:w-[80%] w-full lg:h-[100vh] h-[100%] bg-[#262626]'>
        <TopBar />

        <div className='flex lg:hidden items-center justify-end pt-3 pb-2 px-3'>
          <IoIosList onClick={openDrawer} size={35} className='bg-[#141414] p-2 rounded'/>
        </div>

        <div className='w-full h-[90.5%] lg:h-[91%] flex items-center justify-center'> 
          <Visualization />
        </div>
    </div>
  )
}

export default Main