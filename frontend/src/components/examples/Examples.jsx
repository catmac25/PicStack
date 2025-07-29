import React from 'react'
import Card from "./ExampleHead"
import image1 from "/Users/arpitaarora/Documents/docStation/frontend/src/assets/image1.svg"
import image2 from "/Users/arpitaarora/Documents/docStation/frontend/src/assets/image2.svg"
import image3 from "/Users/arpitaarora/Documents/docStation/frontend/src/assets/image3.svg"
function Examples() {
  
  return (
    <div>
      <p className='text-5xl font-bold text-center '>examples of what you can push here</p>
      <br/>
      <div className='grid lg:grid-cols-3 lg:grid-rows-1 place-items-center grid-cols-1 grid-rows-3 gap-x-10 '>
        <Card image={image1} text="Share rich HD pictures online for readers across the world."></Card>
        <Card image={image2} text="Securely share cards, tickets in jpg, png forms through our url feature."></Card>
        <Card image={image3} text="Upload pictures of your holiday and view the memory forever."></Card>
      </div>
    </div>
  )
}

export default Examples