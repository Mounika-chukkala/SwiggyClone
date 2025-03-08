import React, { useState, useEffect } from "react";
import RestCard from "./RestCard";
function TopRestaurants({ data ,title}) {
  const [value, setValue] = useState(0);
  // const [data,setData]=useState([]);
  function handlenext() {
    value >= 600 ? "" : setValue((prev) => prev + 60);
  }
  function handleprev() {
    value < 0 ? "" : setValue((prev) => prev - 60);
  }

  // async function fetchData() {
  //     const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  //     const res=await data.json()
  //     setData(res?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  // }
  // useEffect(()=>{
  //     fetchData();
  // },[])
  return (
    <div className="mt-1">
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-xl font-bold mt-3">
         {title}
        </h1>

        <div className="flex gap-1 ">
          <div
            onClick={handleprev}
            className="h-[25px] cursor-pointer rounded-full flex justify-center items-center mt-2 p-2"
          >
            <i
              className={
                `fi fi-rr-arrow-small-left  text-2xl ` +
                (value <= 0 ? "text-gray-200" : "text-gray-900")
              }
            ></i>
          </div>
          <div
            onClick={handlenext}
            className="h-[25px]  cursor-pointer rounded-full flex justify-center items-center mt-2 p-2"
          >
            <i
              className={
                `fi fi-rr-arrow-small-right  text-2xl ` +
                (value > 600 ? "text-gray-400" : "text-black")
              }
            ></i>
          </div>
        </div>
      </div>
      <div
        style={{ translate: `-${value}%` }}
        className={`w-full mx-auto flex items-center justify-evenly gap-5   duration-300 my-5`}
      >
        {data.map((restaurant,i) => (
          <div key={i} className="hover:scale-90 duration-300">
            <RestCard restaurant={restaurant} link={restaurant.cta?.link}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRestaurants;
