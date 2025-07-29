import React from 'react'
import icon from "../assets/imgicon.png"
function Information() {
  return (
    <div className='flex flex-row justify-center mt-10 w-full'>
      <h1></h1>
      <div className='lg:h-100 h-200 w-230 border border-[#cddbb2] bg-[#eaf2d7] shadow-[0_0_20px_4px_rgba(205,219,178,0.8)] rounded-2xl lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:place-items-center'>
        <div className='text-2xl flex flex-col justify-center items-center p-15'>
          PicStack is a simple tool to upload your pictures online. Sharing your Pics online can be complicated. With PicStack, simply drag & drop your pictures and we'll save your files in seconds. Upload it once & share infinitely to viewers all over the world! VIA URLs
        </div>
        <div className='flex flex-col justify-center items-center gap-y-10'>
          <img src={icon} className='h-60 w-60'></img>

          <button className='h-10 w-50 bg-yellow-800 shadow-2xl text-white rounded-xl font-medium'>Let's Get Started </button>
        </div>
      </div>
    </div>
  )
}

export default Information;