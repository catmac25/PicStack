import React from 'react'
import icon from "../assets/imgicon.png"
import { PiInstagramLogoThin } from "react-icons/pi";
import { LiaFacebook } from "react-icons/lia";
import { PiYoutubeLogoLight } from "react-icons/pi";
import {Link} from "react-router-dom"
function Footer() {
  return (
    <section className='lg:h-75 h-80 w-screen bg-[#556B2F] grid lg:grid-cols-2 grid-cols-1 gap-y-5'>
        <div className='flex flex-col justify-center items-center'>
            <img src={icon} className='h-50 w-50'></img>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-1'>
           <div className='flex flex-col justify-center items-center gap-y-2'>
           <Link to="/loginregister" className='text-xl text-white'>LOGIN</Link>
            <Link to="/feedback"><div className='text-xl text-white'>FEEDBACK</div></Link>
            <Link to="/contact" className='text-xl text-white'>CONTACT US</Link>
            <Link to="/loginregister" className='text-xl text-white'>REGISTER</Link>
           </div>
           <br/>
           <div className='flex flex-row justify-center gap-x-10'>
            <a href="https://www.instagram.com/thisismexo34/"><PiInstagramLogoThin className='h-12 w-12 text-white'/></a>
           <a href="https://www.facebook.com/"> <LiaFacebook className='h-12 w-12 text-white'/> </a>
            <a href="https://www.youtube.com/"><PiYoutubeLogoLight className='h-12 w-12 text-white'/></a>
           </div>
        </div>
    </section>
  )
}

export default Footer