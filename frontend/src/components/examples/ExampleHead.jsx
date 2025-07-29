import React from 'react'

function Card({image, text}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img className='h-65 w-65' src={image}></img>
      <p className='text-2xl w-80 text-center italic'>{text}</p>
    </div>
  )
}

export default Card;