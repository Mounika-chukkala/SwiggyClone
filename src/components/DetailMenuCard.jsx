import React, { useContext } from 'react'
import { useState } from 'react';
import { CartContext } from '../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import AddToCart from './AddToCart';
function DetailMenuCard({info,resInfo}){
  const {name,
    defaultPrice,price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description="",imageId}=info
    const dispatch=useDispatch()
const cartData=useSelector((state)=>state.cartSlice.cartItems)

const [isDiffRes,setIsDiffRes]=useState(false)

const getResInfoFromLocal=useSelector((state)=>state.cartSlice.resInfo)




// function handleAddToCart(){
//       const isAdded=cartData.find((data)=>data.id===info.id)
//       if(!isAdded){
//         if(getResInfoFromLocal.length==0  || getResInfoFromLocal.name ===resInfo.name){
//           dispatch(addToCart({info,resInfo}))
//           toast.success("food added to the cart")
//         }else{
// // alert("different restaurant item")

//         }
//       }
//       else{
//         // alert("Already added")
//         toast.error("Already added",{
//           position:"top-right",
//           duration:"100"
//         })
//       }
//     }
// function handleNo(){
//       setIsDiffRes((prev)=>!prev)
//     }
// function handleYes(){
//   handleNo()
//     dispatch(clearCart());
//     toast.success("Cart Refreshed ",{position:"bottom-center",
//       duration:"100",
//     })
//     dispatch(addToCart({info,resInfo}))
// }
    const [isMore,setIsMore]=useState(false);
    let trimdes=description.substring(0,115);
    return (
      <div className='relative'>
      <div className="border border-gray-200 rounded-2xl p-4  items-center flex w-full justify-between">
      <div className="w-[75%]">
         {/* {
          vegClassifier==="VEG"?<img src="/home/mounika/Desktop/Projects/swiggy/src/assets/veg.jpg" alt="VEG"/>:
          <img src="/home/mounika/Desktop/Projects/swiggy/src/assets/nonveg.png" alt="" />
  
         }  */}
         <img className="w-[15px] mb-1" src={itemAttribute&& itemAttribute.vegClassifier==="VEG"?"https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg":"https://w7.pngwing.com/pngs/344/498/png-transparent-computer-icons-computer-software-light-non-veg-food-angle-rectangle-orange-thumbnail.png"}/>
          <h2 className="font-bold">{name}</h2>
          <p>₹{defaultPrice/100 || price/100}</p>
          { rating?
            <div className="flex gap-2">
              <p> <i className={"fi fi-ss-star text-"+(rating>=3.5?"yellow-300":"green-600")}></i></p>
              <p>{rating}</p>
              <p> ({ratingCountV2})</p>
              </div>
            :""
          }
          
          {description.length>120 ?
            <div>
          <span className="text-sm">{isMore?description:trimdes}</span>
         <span><button className="font-bold" onClick={()=>setIsMore(!isMore)}>{isMore?" less":"...more"}</button></span> 
          </div>:                <span className="text-sm">{description}</span>
  
  
  
  }</div>
      
        <div className="w-[20%] h-[130px] relative "> 
          <img className="h-[120px] w-[150px] rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/"+imageId}alt="" />
          {/* <button onClick={handleAddToCart} className="bg-white text-green-500 font-bold border border-slate-500 px-7 py-1 rounded-xl absolute -bottom-1 left-2"> ADD </button> */}
<AddToCart info={info} resInfo={resInfo} />
        </div>
      </div>
      
      </div>
    )
  }

export default DetailMenuCard
