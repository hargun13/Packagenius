import React from 'react'
import Sidebar from './Sidebar'
import Main from './BotInterface/Main'
import { DrawerProvider } from './DrawerContext';

const Design = () => {
  return (
    <DrawerProvider>

      <div className='flex items-center justify-center w-full h-full '>
          <Sidebar />
          <Main />
      </div>

    </DrawerProvider>
  )
}

export default Design