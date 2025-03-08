import React from 'react'

function Shimmer() {
  return (
    <div className='w-full '>
      <div className='w-full relative flex flex-col gap-10 justify-center items-center h-[250px] bg-slate-900'>
        <img className='w-[40px]' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa'/>
     <span className='loader absolute top-15'></span>
        <h1 className='text-white text-xl'>Looking for great food near you ....</h1>
      </div>
<div className='w-[70%] pt-3 flex flex-wrap gap-4 opacity-30 mx-auto'>
  
{Array(9).fill(<div className="w-[295px] h-[182px] bg-gray-300 animate rounded-xl"></div>).map((data,i)=> <div key={i}> {data}
</div>)}
</div>



    </div>
  )
}

export default Shimmer

export function MenuShimmer(){
    return (
        <div className="w-[50%] mx-auto my-4">
            <div className="w-full h-50 rounded-xl opacity-60 animate"></div>
            <div className='flex gap-10 my-4 opacity-50'>
                <div className='w-[30%] animate h-20 rounded-xl'></div>
                <div className='w-[30%] animate h-20 rounded-xl'></div>
                <div className='w-[30%] animate h-20 rounded-xl'></div>
            </div>
            <div className="w-full mt-20 flex flex-col gap-9">
                {Array(3)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export function SearchShimmer(){
    return (
        <div className="w-full mt-5 ml-5 flex flex-wrap gap-2">
        {Array(8)
            .fill("")
            .map((data,i) => (

                    <div key={i} className="w-[45%] rounded-xl h-30 animate"></div>
                
            ))}
    </div>

    )
}