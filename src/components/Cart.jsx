import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import { toggleLogin } from '../utils/toggleSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SignInPage from './SignInPage';
import OrderPlaced from './OrderPlaced';
function Cart() {
// const {cartData,setCartData} = useContext(CartContext);
// let totalPrice=0;
const navigate=useNavigate()
const cartData=useSelector((state)=>state.cartSlice.cartItems)
  const userData=useSelector((state)=>state.authSlice.userData)
 const resInfo=useSelector((state)=>state.cartSlice.resInfo)
const dispatch=useDispatch()
// for(let i=0;i<cartData.length;i++){
//   totalPrice+=cartData[i].price/100 || cartData[i].defaultPrice/100;
// }
let totalPrice=cartData.reduce((acc,curval)=> (acc+curval.price/100 || curval.defaultPrice/100),0)
function handleRemoveCart(i){
  if(cartData.length>1){
    let newArr=[...cartData];
    newArr.splice(i,1);
    // setCartData(newArr); 
dispatch(deleteItem(newArr))
toast.success("Item removed",{position:"top-right",
  duration:"100"
})
    localStorage.setItem("cartData",JSON.stringify(newArr))
  }
  else{
    handleClearCart()
  }
  
}

function handleClearCart(){
  // setCartData([]);
  // localStorage.setItem("cartData",JSON.stringify([]))
  dispatch(clearCart());
  toast.success("Cart Cleared ",{position:"top-right",
    duration:"100"
  })
}
function handlePlaceOrder(){
  if(!userData){
 toast.error("bro first log in brooo")
dispatch(toggleLogin())
 return
  }
// toast.success("Order Placed",{
//   position:"top-center",
//   duration:2000,
//   style:{
//     padding:"20px",
//     fontWeight:"bold",
//     fontSize:"25px"
//   }
// }) 
//  toast.success("Cart Cleared ",{position:"top-right",
//     duration:"100"
  // })
// 

  handleClearCart()
}
if(cartData.length===0){
  return ( 

    <div className='w-full h-full flex justify-center items-center'>
     
    <div  className='w-[50%] m-10 gap-2 flex flex-col justify-center items-center'>
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp" alt="" className='w-[40%] ' />
    <h1 className='font-bold text-3xl  text-center'>Cart is Empty </h1>
    <p className='text-sm'>Go to home page to find some restaurants</p>
<Link to="/"  > <button className=' bg-orange-500 text-center text-white font-bold px-7 py-2 cursor-pointer my-4'>Order from here</button></Link>
    </div>

  </div>
  )
}
return (
<div className='w-full mt-5 flex flex-col justify-center items-center'>
<Link to={`/restaurantMenu/`+resInfo.id}>

<div className=' flex gap-10 '>
  
<img className='rounded-2xl w-[150px] h-[120px] my-2'  src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/"+(resInfo.imageId || resInfo.cloudinaryImageId)
} alt="" />
<div className='my-2 flex flex-col'>
<h1 className='font-bold  text-orange-500 border-b-2 border-orange-500 pb-1 text-lg'>{resInfo.name}</h1>
<p className='text-sm my-3 '>{resInfo.areaName}</p>
</div>
</div>
</Link>
    <div className='w-[50%] mx-a uto '>
      
<div>
  {cartData.map(({name,
    defaultPrice,price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description="",imageId},i)=>{
  
      return (
        <div key ={imageId} className="border border-gray-200 rounded-2xl p-4  items-center flex w-full justify-between my-2">
        <div className="w-[75%]">
        
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
            
            {/* {description.length>120 ?
              <div>
            <span className="text-sm">{isMore?description:trimdes}</span>
           <span><button className="font-bold" onClick={()=>setIsMore(!isMore)}>{isMore?" less":"...more"}</button></span> 
            </div>:                <span className="text-sm">{description}</span>
    
    
    
    }*/}
    <p className='text-sm line-clamp-1'>{description}</p>
    </div> 
        
          <div className="w-[20%] h-[130px] relative "> 
            <img className="h-[120px] w-[150px] rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/"+imageId}alt="" />
            <button onClick={handleRemoveCart} className="bg-red-500 text-white font-bold border border-slate-500 px-7 py-1 rounded-xl absolute -bottom-1 left-1"> Remove </button>
          </div>
        </div>
) })}
</div>

<h1 className='text-lg font-bold '>Total Price : ₹ {totalPrice}</h1>

    <div className='flex justify-between w-full'>
        <button onClick={handleClearCart} className='bg-red-500 cursor-pointer text-white font-bold rounded-xl px-5 py-2 my-5 '>Clear Cart</button>
        <button onClick={handlePlaceOrder} className='bg-green-600 cursor-pointer text-white font-bold rounded-xl px-5 py-2 my-5 '>Place order</button>
        </div>

    </div>
    </div> 
       
  )
}

export default Cart
