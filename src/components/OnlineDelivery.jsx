import React, { useState } from 'react'
import RestCard from './RestCard'
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';

function OnlineDelivery({data,title}) {
const dispatch=useDispatch()
  const FilterOptions=["Ratings 4.0+","Offers",  "Rs.300 to Rs.600","Less than Rs.300"]
  const [activeBtn,setActiveBtn]=useState(null);
  function handleFilter(filterName){
    setActiveBtn(activeBtn===filterName?null:filterName)
  }
  dispatch(setFilterValue(activeBtn))
    return (
    <div className='mt-3 '>
     <h1 className='font-bold text-xl'>{title}</h1>
     <div className='flex gap-2 my-3'>
      {
        FilterOptions.map((filterName,i)=>(
          <button key={i} onClick={()=>handleFilter(filterName)} className={'fltrbtn cursor-pointer ' +(activeBtn===filterName?"active":"")}>{filterName}
          <i  className='fi fi-br-cross hidden text-[8px] mx-2'></i></button>

        ))
      }
     </div>
     <div className='grid grid-cols-4 gap-7 mt-5'>
     {data.map((restaurant,i) => (
          <div key={i} className="hover:scale-90 duration-300">
            <RestCard restaurant={restaurant} link={restaurant.cta?.link}/>

          </div>
        ))}
     </div>
     
    </div>
  )
}

export default OnlineDelivery
