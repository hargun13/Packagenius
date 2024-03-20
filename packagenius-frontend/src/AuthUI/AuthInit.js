import React from 'react'
import './Auth.css'
import Signup from './Assets/signup.jpg'
import { IoLogoGoogle } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal'
 

const AuthInit = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        
        <div className='hidden lg:w-[50%] h-full p-10 lg:flex items-center justify-center'>
            <Fade duration={5000} className='flex items-center justify-center'>
                <img src={Signup} alt='init page' className='h-full w-[70%] rounded-2xl shadow-2xl auth_image'/>
            </Fade>
        </div>
        

        <div className='lg:w-[50%] w-full h-full p-10 flex items-center justify-start'>
            
            <div className='lg:w-[80%] w-full'>
                <Fade damping={0.05} duration={5000}>
                <h1 className='text-3xl lg:text-4xl font-semibold mb-16 tracking-wider'>Unlock the Endless Possiblities in Packaging</h1>
                </Fade>

                <Fade damping={0.05} duration={5000}>
                <button className='bg-[#000000] lg:w-[85%] w-full p-3 my-3 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#292b2c]'>
                    <div className='flex items-center justify-start gap-4 font-normal'>
                        <IoLogoGoogle size={25}/> Continue with Google
                    </div>
                    <div className='flex items-center justify-end gap-3 '>
                        <span className='text-[#363636] text-3xl pb-2'>|</span>
                        <div className='flex items-center justify-center rounded-full bg-[#0d0e0f] p-3 bg-opacity-90 border border-[#363636]'><LuArrowRight size={20}/></div>
                    </div>
                </button>

                <Link to='/signup'>
                <button className='bg-[#000000] lg:w-[85%] w-full p-3 my-3 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#292b2c]'>
                    <div className='flex items-center justify-start gap-4 font-normal'>
                        <HiOutlineMail size={25}/> Continue with Email
                    </div>
                    <div className='flex items-center justify-end gap-3 '>
                        <span className='text-[#363636] text-3xl pb-2'>|</span>
                        <div className='flex items-center justify-center rounded-full bg-[#0d0e0f] p-3 bg-opacity-90 border border-[#363636]'><LuArrowRight size={20}/></div>
                    </div>
                </button>
                </Link>  
                </Fade>

                <Fade duration={5000}>
                <p className='text-xs lg:w-[85%] w-full text-[#434C56] font-semibold my-5'>By Signing in, you agree to ESG's <span className='underline'>Terms of Service</span>, <span className='underline'>Privacy Policy</span> and <span className='underline'>Data Usage Properties</span> </p> 
                </Fade>

            </div>

        </div>

    </div>
  )
}

export default AuthInit