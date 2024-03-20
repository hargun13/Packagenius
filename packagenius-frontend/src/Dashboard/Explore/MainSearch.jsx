import React from 'react'
import { PiSparkleFill } from "react-icons/pi";
import Mural from './Mural';


const MainSearch = () => {
  return (
    <div className='flex flex-col items-center justify-between h-[91%]'>

        <div className='flex flex-col items-center justify-center mt-16 mb-5 w-full'>
            <p className='text-center text-4xl font-semibold tracking-wide my-2'>Generate packaging designs with just a prompt</p>
            <p className='text-center text-sm text-[#B0B0A2] my-2'>Packagenius is a Packaging Design generation platform for easy, fast and sustainable design ideation</p>
        
            
            <form className="lg:w-[60%] w-[90%] my-8">   
                <div className="relative">
                    
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-[#262626] focus:outline-none" placeholder="Generate Designs..." required />
                    
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center gap-3"><PiSparkleFill size={18}/>Generate...</button>

                </div>
            </form>
        </div>


        <div className='w-full h-[80%]'>
            <Mural />
        </div>
    
    </div>
  )
}

export default MainSearch