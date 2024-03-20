import React from 'react'
import Sidebar from './Sidebar'
import Main from './Interface/Main'
import { DrawerProvider } from './DrawerContext';

const Visualize = () => {
  return (
    <DrawerProvider>
    <div className='flex items-center justify-center w-full h-full '>
        <Sidebar />
        <Main />
    </div>
    </DrawerProvider>
  )
}

export default Visualize