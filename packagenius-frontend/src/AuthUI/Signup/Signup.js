import React,{ useState } from 'react'
import axios from 'axios';
import '../Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import Signup_Img from '../Assets/signup.jpg'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { Fade } from 'react-awesome-reveal';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', {
                email: email,
                password: password
            });
            console.log(response.data);
            toast.success('User Registered Successfully...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            
            
            // Redirect to success page or do something else upon successful signup
            setTimeout(() => {
                navigate('/explore')
            }, 4000);
            
        } catch (error) {
            setError(error.response.data.error);
        }
    };


  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        
        <div className='hidden lg:w-[50%] h-full p-10 lg:flex items-center justify-center'>
            <Fade duration={5000} className='flex items-center justify-center'>
                <img src={Signup_Img} alt='init page' className='h-full w-[70%] rounded-2xl shadow-2xl auth_image'/>
            </Fade>
        </div>

        <div className='lg:w-[50%] w-full h-full lg:p-10 p-5 flex items-center justify-start'>
            
            <div className='lg:w-[80%] w-full'>
                <Fade duration={2000}>
                <h1 className='text-3xl lg:text-4xl font-semibold mb-5 tracking-wider'>Create Your Account to Get Packa<span className='text-green-400'>genius</span></h1>

                <div className='lg:w-[85%] w-full flex items-center justify-between mb-5'>
                    <Link to='/auth-init'>
                        <div className='flex items-center justify-center rounded-full bg-[#0d0e0f] p-3 bg-opacity-90 border border-[#363636] lg:h-12 lg:w-12 h-10 w-10 cursor-pointer'><LuArrowLeft size={20}/></div>
                    </Link>

                    <div className='flex items-center justify-center lg:gap-3 gap-1 mr-1'>
                        <p className='text-sm text-[#434C56] font-semibold my-5'>Already have an account?</p>
                        
                        <Link to='/login'>
                            <button className='text-sm bg-[#151516] border-[#9aa1a7] border px-2 py-1 rounded-lg text-[#757677]'>Log In</button>
                        </Link>
                    </div>
                </div>
                </Fade>
                
                <Fade duration={1000} cascade>
                <div className='bg-[#000000] lg:w-[85%] w-full p-3 my-2 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#181818]'>
                    <input type="text" id="full_name" className="focus:outline-none bg-transparent text-gray-400 text-sm rounded-lg block w-full p-2.5" placeholder="Full Name" required />
                </div>

                <div className='bg-[#000000] lg:w-[85%] w-full p-3 my-2 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#181818]'>
                    <input type="email" id="email" className="focus:outline-none bg-transparent text-gray-400 text-sm rounded-lg block w-full p-2.5" placeholder="Email Address" required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='bg-[#000000] lg:w-[85%] w-full p-3 my-2 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#181818]'>
                    <input type={showPassword ? "text" : "password"} id="password" className="focus:outline-none bg-transparent text-gray-400 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>

                    {showPassword ? <VscEye className='mr-2' onClick={() => setShowPassword(false)} size={25}/> : <VscEyeClosed className='mr-2' onClick={() => setShowPassword(true)} size={25}/>}
                </div>
                
                <button className='bg-[#000000] lg:w-[85%] w-full p-3 my-3 rounded-2xl bg-opacity-10  border-[#9aa1a7] border buttons flex items-center justify-between transition duration-300 hover:bg-[#181818]'
                onClick={handleSignup}>
                    <div className='flex items-center justify-center w-full ml-6 font-normal'>
                        Start Analyzing
                    </div>
                    <div className='flex items-center justify-end gap-3 '>
                        <div className='flex items-center justify-center rounded-full bg-[#0d0e0f] p-3 bg-opacity-90 border border-[#363636]'><LuArrowRight size={20}/></div>
                    </div>
                </button>
                </Fade>


                <Fade duration={2000}>
                {error && <p className="text-red-500">{error}</p>}
                <p className='text-xs lg:w-[85%] w-full text-[#434C56] font-semibold my-5'>By Signing in, you agree to ESG's <span className='underline'>Terms of Service</span>, <span className='underline'>Privacy Policy</span> and <span className='underline'>Data Usage Properties</span> </p> 
                </Fade>

            </div>

        </div>

        <ToastContainer />

    </div>
  )
}

export default Signup