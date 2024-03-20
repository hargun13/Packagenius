import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';//useNavigate
import { usePageContext } from './Context/PageContext'

import { PiCoinVerticalThin } from "react-icons/pi";
import { TbTelescope } from "react-icons/tb";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { GrCompliance } from "react-icons/gr";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Sidebar = () => {

    const { setPageId } = usePageContext()
    // const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1024); // Adjust the breakpoint as per your design
        };

        handleResize(); // Check on component mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = (pageId) => {
        if (pageId === 4) {
            setPageId(4);
        } else if(pageId === 5){
            setPageId(5);
        } else if(pageId === 6){
            setPageId(6);
        } else if(pageId === 7){
            setPageId(7);
        }
        setAnchorE2(null);

    };


  return (
    <div className='lg:w-[5.85%] w-full lg:px-1 px-3 py-2 lg:py-4 lg:h-full flex lg:flex-col flex-row items-center justify-between text-sm lg:border-r border-b border-[#4e4e4e]'>

        <div className='flex lg:flex-col flex-row items-center justify-between gap-4'>
            <div className='flex flex-col items-center justify-center gap-1 text-[13px] cursor-pointer'>
                <div className='flex flex-col items-center justify-center rounded-lg lg:p-2 hover:bg-[#303030] ' onClick={() => setPageId(1)}><TbTelescope size={25}  className='hidden lg:block'/>Explore</div>
            </div>

            <div className='flex flex-col items-center justify-center gap-1 text-[13px] cursor-pointer'>
                <div className='flex flex-col items-center justify-center  rounded-lg lg:p-2 hover:bg-[#303030] ' onClick={() => setPageId(2)}><FaRegPenToSquare size={23} className='hidden lg:block'/>Design</div>
            </div>

            <div className='flex flex-col items-center justify-center gap-1 text-[13px] cursor-pointer'>
                <div className='flex flex-col items-center justify-center  rounded-lg lg:p-2 hover:bg-[#303030] ' onClick={() => setPageId(3)}><BiPackage size={25} className='hidden lg:block'/>Visualize</div>
            </div>

            {isMobileView ? (
                    <div className='flex flex-col items-center justify-center gap-1 text-[13px] cursor-pointer'>
                        <div className='flex flex-col items-center justify-center rounded-lg lg:p-2 hover:bg-[#303030]' onClick={handleClick2}>
                            More
                        </div>
                        <Menu
                            anchorE2={anchorE2}
                            open={Boolean(anchorE2)}
                            onClose={handleClose2}
                            style={{ marginTop: "30px"}}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <MenuItem onClick={() => handleClose2(4)}>Compliance</MenuItem>
                            <MenuItem onClick={() => handleClose2(5)}>Blogs</MenuItem>
                            <MenuItem onClick={() => handleClose2(6)}>Pricing</MenuItem>
                            <MenuItem onClick={() => handleClose2(7)}>Discord</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-1 text-[13px] cursor-pointer'>
                        <div className='flex flex-col items-center justify-center rounded-lg lg:p-2 hover:bg-[#303030]' onClick={() => setPageId(4)}>
                            <GrCompliance size={25} className='hidden lg:block' />
                            Compliance
                        </div>
                    </div>
                )}
        </div>

        <div className='flex flex-col items-center justify-around gap-2 lg:pb-2'>
            <div className='rounded-lg p-1 hover:bg-[#303030] cursor-pointer'>
                <img src='https://production.listennotes.com/podcasts/iman-gadzhi-iman-gadzhi-community-fZ4P2URCEqo-9Wd3CqxbnLp.300x300.jpg' alt='profile' className='rounded-full h-9 w-9' onClick={handleClick1}/>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose1}
                    style={isMobileView ? {marginLeft:"0px", marginTop:"35px"} : {marginLeft:"35px", marginTop:"-35px"}}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Link to="/profile"><MenuItem onClick={handleClose1}>Profile</MenuItem></Link>
                    <Link to="/auth-init"><MenuItem>Logout</MenuItem></Link>
                </Menu>
            </div>

            <p className='hidden lg:flex items-center justify-center text-[13px] gap-[2px] text-[#A2B0A2] font-semibold'><PiCoinVerticalThin size={16}/>150</p>
        </div>

    </div>
  )
}

export default Sidebar