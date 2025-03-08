import React, { useEffect, useState } from 'react'

function Onyourmind({data}) {
    // const[data,setData]=useState([]);
    const[value,setValue]=useState(0);

   
function handlenext(){
   value>=120?"":setValue((prev)=>prev+35);

}
function handleprev(){
  value<0?"":setValue((prev)=>prev-35);

}
  return (
    <>
       <div className='w-full flex justify-between items-center '>
            <h1 className='text-xl font-bold'>What's on your mind ?</h1>
            
            <div className='flex gap-1 '>
                <div onClick={handleprev} className='h-[25px] cursor-pointer rounded-full flex justify-center items-center mt-2 p-2'>
                <i className={`fi fi-rr-arrow-small-left  text-2xl `+(value<=0?"text-gray-200":"text-gray-900")}></i>
                </div>
                <div onClick={handlenext} className='h-[25px]  cursor-pointer rounded-full flex justify-center items-center mt-2 p-2'>
                <i className={`fi fi-rr-arrow-small-right  text-2xl `+(value>120?"text-gray-400":"text-black")}></i>
                </div>

            </div>
            </div>
            <div style={{translate:`-${value}%`}} className={`w-full mx-auto flex items-center justify-evenly g-3   duration-300 my-2`}>
            {
                data.map((item,i)=>(
                    <img key={i} className='w-25' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt=""/>
                ))
            }
            </div>
    </>
  )
}

export default Onyourmind
