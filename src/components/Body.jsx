import { useState,useEffect, useContext } from 'react'
import Onyourmind from './Onyourmind'
import TopRestaurants from './TopRestaurants'
import OnlineDelivery from './OnlineDelivery';
import { Coordinate } from '../context/contextApi';
import { data, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from '../utils/cartSlice';
import Shimmer from './Shimmer';

function Body() {
 const [TopRestaurantData,setTopData]=useState([]);
 const [TopRestauranttitle,setTopResTitle]=useState("");
 const [OnlineTitle,setOnlineTitle]=useState("");

 const [onYourMindData,setOnMindData]=useState([]);
 const {coord:{lat,lng}}=useContext(Coordinate)
 const dispatch=useDispatch();
const navigate=useNavigate();
 async function fetchData() {
         const data=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
         const res=await data.json()
setTopResTitle(res?.data?.cards[1]?.card?.card?.header?.title)
setOnlineTitle(res?.data?.cards[2]?.card?.card?.title)
console.log(res)

let mainData=res?.data?.cards.find(data=> data?.card?.card?.id=="top_brands_for_you").card?.card?.gridElements?.infoWithStyle?.restaurants

         setTopData(mainData)

let data2=res?.data?.cards.find(data=> data?.card?.card?.id=="whats_on_your_mind").card?.card?.imageGridCards?.info
         setOnMindData(data2)
        }
        const fetchAndNavigate = async () => {
          await fetchData();  // Waits for fetchData to complete

        };
     useEffect(()=>{
        fetchAndNavigate();
     
     },[lat,lng])
console.log(TopRestaurantData)
     const filterVal=useSelector((state)=>state.filterSlice.filterVal)
     const filterData=TopRestaurantData.filter(item=>{
      if(!filterVal) return true;
      switch (filterVal){
        case "Ratings 4.0+":
          return item?.info?.avgRating>4;
        case "Offers":
          return item?.info?.aggregatedDiscountInfoV3?.header ;
          case "Rs.300 to Rs.600": return item?.info?.costForTwo?.split(" ")[0].slice(1) >="300" && item?.info?.costForTwo?.split(" ")[0].slice(1)<="600";
            case "Less than Rs.300":return item?.info?.costForTwo?.split(" ")[0].slice(1) <"300"
              default:return true;
      }
     })
    //  console.log(filterVal)
  return (

    <div className='w-full min-h-screen'>
    {
      TopRestaurantData.length?(      <div className='w-[75%] mx-auto flex-col items-center overflow-x-hidden justify-evenly g-3 mt-5 pt-3'>
        {  onYourMindData && TopRestaurantData ?
        <>
           <Onyourmind data={onYourMindData}/>
              <hr className='border border-slate-200'/>            
             <TopRestaurants data={TopRestaurantData} title={TopRestauranttitle}/>
             <hr className='border border-slate-200'/>            
  <OnlineDelivery data={filterVal?filterData:TopRestaurantData} title={OnlineTitle}/>
  </>:                <div className='w-full mt-20 h-full flex flex-col justify-center items-center'>
    <img className="w-[150px] h-[200px]" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"/>
    <h1 className=' mt-20 text-2xl font-extrabold text-center'>Location Unservicable</h1>
  </div>
  
  }
          </div> ):
          <Shimmer/>
    }

    </div>
  )
}

export default Body
