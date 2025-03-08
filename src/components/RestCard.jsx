import React from 'react'
import { Link } from 'react-router-dom'
function RestCard({restaurant,link}) {
// console.log(link);
// console.log(typeof link.split("/")[5])
  return (
    <Link to={`/restaurantMenu/${link.split("/")[5]}`}>
         <div className="min-w-[240px] h-[152px] relative">
              <img
                className=" w-full h-full rounded-xl object-cover"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/" +
                  restaurant.info.cloudinaryImageId
                }
                alt=""
              />
              <div className="absolute bg-gradient-to-t from-black  to-transparent from-10% w-full h-full top-0 hover:hidden rounded-2xl"></div>
              <p className="absolute bottom-0 text-xl font-bold text-white p-2">
                {" "}
                {restaurant.info?.aggregatedDiscountInfoV3?.header 
                  ? restaurant.info?.aggregatedDiscountInfoV3?.header +
                    " " +
                    (restaurant.info?.aggregatedDiscountInfoV3?.subHeader?
                    restaurant.info?.aggregatedDiscountInfoV3?.subHeader :"Sale")
                  : "Tasty food"}
              </p>
            </div>
            <div className="mt-1 pl-1">
                    <h3 className="font-semibold line-clamp-1">{restaurant.info.name}</h3>
                    <p className="flex font-medium items-center gap-1"> <i className="fi fi-ss-circle-star mt-1 text-lg text-green-600"></i>{restaurant.info.avgRating} - <span  className="text-gray-600"> {restaurant.info.sla.slaString}</span></p>
                    <p className="line-clamp-1 text-gray-600">{restaurant.info.cuisines.join(" , ")}</p>
                    <p className="text-gray-600">{restaurant.info.locality}</p>
            </div>
    </Link>
  )
}

export default RestCard
