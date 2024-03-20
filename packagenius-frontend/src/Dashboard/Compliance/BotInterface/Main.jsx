import React from 'react'
import TopBar from './TopBar'
import Chat from './Chat'
import { useComplianceLoadContext } from './ComplianceLoadingContext';
import LinearProgress from '@mui/material/LinearProgress';


const Main = () => {
  const { loading } = useComplianceLoadContext()

  return (
    <div className='w-full h-[93vh] lg:h-[100vh] bg-[#262626] flex flex-col items-center justify-center'>
        
        <div className='hidden lg:flex w-full'>
          <TopBar />
        </div>

        {loading && <LinearProgress className='w-full'/>}

        <Chat />
    </div>
  )
}

export default Main