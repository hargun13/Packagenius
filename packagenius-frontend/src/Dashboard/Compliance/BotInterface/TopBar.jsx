import React from 'react'
import { CiGlobe } from "react-icons/ci";
import { FaEllipsisH } from "react-icons/fa";
// import LinearProgress from '@mui/material/LinearProgress';
// import { useComplianceLoadContext } from './ComplianceLoadingContext';

const TopBar = () => {

  // const { loading } = useComplianceLoadContext()

  return (
    <div className='w-full'>
      <div className='w-[100%] py-3 px-8 flex items-center justify-between gap-3 text-sm font-bold border-b border-b-[#4e4e4e]'>
          <p className=''></p>
          <p className='rounded-lg px-4 py-2 cursor-default flex items-center justify-center gap-2'><CiGlobe size={20} />Welcome to TruComply, Your Compliance Buddy!</p>
          <p className='flex items-center justify-center gap-1 rounded-full p-2 hover:bg-[#303030] cursor-pointer'><FaEllipsisH size={20} /></p>
      </div>
      {/* {loading && <LinearProgress />} */}
    </div>
  )
}

export default TopBar