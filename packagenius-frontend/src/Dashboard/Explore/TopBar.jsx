import React from 'react'
import { RiDiscordLine } from "react-icons/ri";


const TopBar = () => {
  return (
    <div className='py-3 px-8 hidden lg:flex items-center justify-end gap-3 text-sm font-bold border-b border-b-[#4e4e4e]'>
        <p className='rounded-lg px-4 py-2 hover:bg-[#303030] cursor-pointer'>Blogs</p>
        <p className='rounded-lg px-4 py-2 hover:bg-[#303030] cursor-pointer'>Pricing</p>
        <p className='flex items-center justify-center gap-1 rounded-lg px-4 py-2 hover:bg-[#303030] cursor-pointer'><RiDiscordLine />Discord</p>
    </div>
  )
}

export default TopBar