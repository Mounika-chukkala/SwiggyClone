import React from "react";
import AddToCart from "./AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { setSimilarDish } from "../utils/toggleSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Dishes({
  data: {
   
        info,
        restaurant: { info: resInfo },
        hideRestaurantDetails=false
      },
    },
 ) {
const dispatch=useDispatch();
  let { imageId, cloudinaryImageId, name, price, isVeg = 0,id:itemId } = info;
   const {id:resId,name:restaurantName}=useSelector((state)=>state.cartSlice.resInfo);
  let {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    slugs:{
        city,restaurant:resLocation 
    }
  } = resInfo;
 function handleSameRes(){
    if( !resId || resId==id ){
        dispatch(setSimilarDish({
            isSimilarDish:true,
            city,
            resLocation,
            resId,
            itemId
            }))
    }
    // else{
    //     toast.error(`Try to order from ${restaurantName} or start afresh`)
    // }
 }
  return (
    <div className={`bg-white mt-2 rounded-2xl p-4  mx-2  `}>
   
   { !hideRestaurantDetails &&
   <>
   <Link to={`/restaurantMenu/${resLocation}-${resId}`}>
 <div className="flex justify-between items-center">
 <div>
   <p className="text-sm mb-1 font-semibold opacity-80">{resName}</p>
   <div className="flex  gap-1 text-xs font-base opacity-30 mb-1">
     <i className="fi fi-ss-star"></i>
     <p>{avgRating} . </p>
     <span>{slaString}</span>
   </div>
 </div>
 <i className=" text-xl opacity-50 fi fi-rr-arrow-small-right"></i>
</div>
</Link>
      <hr className="border-dotted opacity-20" />
</>
   }  
      <div className="flex justify-between  mt-2">
        <div className="w-[55%]">
          <img
            className="w-[15px]"
            src={
              isVeg
                ? "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
                : "https://e7.pngegg.com/pngimages/344/498/png-clipart-computer-icons-computer-software-light-non-veg-food-angle-rectangle.png"
            }
            alt=""
          />
          <h1 className="text-[15px] line-clamp-2 mt-1 font-semibold opacity-80">
            {name}
          </h1>
          <p className="text-sm">₹{price / 100}</p>
          <button className="border mt-3 rounded-2xl px-2 py-1 text-xs">
            More details?
          </button>
        </div>
        <div className="w-[40%] h-[130px] relative ">
          <img
            className="aspect-square object-cover rounded-xl"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
              imageId
            }
            alt=""
          />
          <div onClick={handleSameRes}>
          <AddToCart 
            resInfo={resInfo}
            info={info}
            // handleDiffRes={handleDiffRes}
          />
          </div>
          
        </div>
      </div>
    </div>
    
  );
}

export default Dishes;
