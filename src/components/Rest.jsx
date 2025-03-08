import React from 'react'
function Rest({data:{
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          costForTwoMessage,cuisines,
          name: resName,
          aggregatedDiscountInfoV3={},
          promoted=false,
          avgRating,
          sla: { slaString },
        }
       
      },
    },
  }}) {
  return (
    <div className='bg-white mt-2 mx-2 p-2 rounded-xl h-[120px] items-center flex gap-3'>
        <div className='w-[100px]'>
            <img className='aspect-square w-[100px] object-cover rounded-lg' src={"https://media-assets.swiggy.com/swiggy/image/upload/"+cloudinaryImageId}/>
        </div>
        <div className='flex flex-col'>
        <h1 className='text-[14px] font-bold line-clamp-1'>{resName}</h1>
        <div className="flex  gap-1 text-xs font-base opacity-70 mb-1">
            <i className="fi fi-ss-star"></i>
            <p>{avgRating} . </p>
            <span>{costForTwoMessage}</span>
          </div>
<p className='text-xs line-clamp-1'>{cuisines.join(" , ")}</p>

        </div>
</div>

  )
}

export default Rest

export function withHoc(WrappedComp){

 return (prop)=>{
return (
<div className='relative'>
<p className='absolute text-xs top-2 left-1 bg-gray-300 p-1'>Ad</p>
<WrappedComp {...prop} />
</div> 
// console.log("hello")
)
// return "hello"
 };

}