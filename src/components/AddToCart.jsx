import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart } from '../utils/cartSlice';

function AddToCart({info,resInfo}) {
    const cartData=useSelector((state)=>state.cartSlice.cartItems)
    const getResInfoFromLocal=useSelector((state)=>state.cartSlice.resInfo)
    const dispatch=useDispatch()
const [isDiffRes,setIsDiffRes]=useState(false)
function handleDiffRes(){
    setIsDiffRes((prev)=>!prev)
    
    }
    function handleNo(){
          setIsDiffRes((prev)=>!prev)
        }
    function handleYes(){
      handleNo()
        dispatch(clearCart());
        toast.success("Cart Refreshed ",{position:"bottom-center",
          duration:"100",
        })
        // dispatch(addToCart({info,resInfo}))
    }
    function handleAddToCart(){
        const isAdded=cartData.find((data)=>data.id===info.id)
        // let getResInfoFromLocal=JSON.parse(localStorage.getItem("resInfo")) || []
        if(!isAdded){
          if(getResInfoFromLocal.length==0  || getResInfoFromLocal.name ===resInfo.name){
            dispatch(addToCart({info,resInfo}))
            toast.success("food added to the cart")
            
          }else{
  // alert("different restaurant item")
//   setIsDiffRes((prev)=>!prev)
  handleDiffRes();
  // toast.error("different restaurant from cart items")
          }
        }
        else{
          // alert("Already added")
          toast.error("Already added",{
            position:"top-right",
            duration:"100"
          })
        }
      }
  return (
    <div className='relative'>    <div>
                <button
           onClick={handleAddToCart} 
           className="bg-white cursor-pointer text-green-500 font-bold border border-slate-500 px-7 py-1 rounded-xl absolute -bottom-2 left-2"> ADD </button>

    </div>
    {
        isDiffRes && (
          <div className='w-[400px] h-[180px] p-5 left-[35%] bottom-7 z-100 bg-white fixed shadow shadow-3xl  flex flex-col gap-3'>
              <h1 className='font-bold'>Items already in cart</h1>
             <div>
             <p className='text-sm'>Your cart contains items from other restaurant.</p>
              <p className='text-sm'>
                Would you like to reset your cart for adding items from this restaurant ?
              </p>
              </div> 
              <div className='flex justify-around gap-2'>
                <button onClick={handleNo} className='w-1/2 border px-3  py-1 cursor-pointer border-green-600 font-bold text-green-600'>No</button>
                <button onClick={handleYes} className='w-1/2 bg-green-600 px-3 py-1 cursor-pointer text-white font-bold'>Yes,Start afresh</button>
              </div>
          </div>
        )
      } 
       </div>
  )
}

export default AddToCart
