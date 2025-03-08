import React from 'react'
import { Link } from 'react-router-dom'
function EmptyPage() {
  return (
    <Link to={"/*"}>

    <div className='w-[50%] mx-auto my-20 flex flex-col items-center gap-10'>
        <img className='w-[150px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIeM7xyD2d3y8eiPWvFxjSKqZW6xxR-Y5xA&s"/>
      <h1 className='text-2xl font-bold '>Will be added Soon ...</h1>
    </div>
    </Link>
  )
}

export default EmptyPage
