import React from 'react'

function Card({text, heading}) {
  return (
    <div className='h-45 w-80 border-[#cddbb2] bg-[#eaf2d7] shadow-[0_0_20px_4px_rgba(205,219,178,0.8)] rounded-2xl flex flex-col justify-center items-center 
    transform transition-transform duration-300 hover:scale-110 hover:border-blue-900'>
        <h1 className='text-2xl font-bold '>{heading}</h1>
        <p className='p-5 text-xl text-center'>{text}</p>
    </div>
  )
}

export default Card