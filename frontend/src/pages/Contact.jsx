import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const Contact = () => {
  return (
    <section className='h-screen grid lg:grid-cols-2 lg:grid-rows-1'>
       <div className='bg-[#8e9b78] rounded-r-full flex flex-col justify-center items-center'>
        <div className='text-6xl font-bold text-white'>Get In Touch</div>
        <br/>
        <div className='w-150 text-medium font-extralight text-center text-white'>Have a query or need support? Our team is here to help. </div>
       </div>
       <div className='flex flex-col justify-center items-center gap-y-35'>
        <div className='flex flex-row justify-around items-center gap-x-15'>
            <div className='flex flex-col justify-center items-center text-center'>
                <MdEmail className='h-10 w-10'/>
                <br/>
                <p className='text-3xl font-bold'>MAIL US</p>
                <p className='w-50'>just drop an email to us and here we come</p>
                <p className='text-blue-700'>picstackcare@gmail.com</p>
            </div>
            <div className="h-50 w-px bg-black mx-4"></div>
            <div className='flex flex-col justify-center items-center text-center'>
                <FaPhoneAlt className='h-10 w-10'></FaPhoneAlt>
                <br/>
                <p className='text-3xl font-bold'>CALL US</p>
                <p>one ring, service bling!</p>
                <p className='text-blue-700'>+91 2223569284</p>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
            <FaDiscord className='h-10 w-10'/>
            <br/>
                <p className='text-3xl font-bold'>RESOLUTION CHAT</p>
                <p>maybe you could find your soln via others! Join our discord server</p>
                <p className='text-blue-700'>https://discord.com/</p>
            </div>
       </div>
    </section>
  )
}

export default Contact