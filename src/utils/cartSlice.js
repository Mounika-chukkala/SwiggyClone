import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cartItems:JSON.parse(localStorage.getItem("cartData"))||[],
        resInfo:JSON.parse(localStorage.getItem("resInfo")) || []    },
    reducers:{
        addToCart:(state,action)=>{
            // setCartData(prev=>[...prev,info])
          const {info,resInfo}=action.payload
          state.resInfo=resInfo
            state.cartItems=[...state.cartItems,info]
          localStorage.setItem("cartData", JSON.stringify(state.cartItems));  
          localStorage.setItem("resInfo",JSON.stringify(resInfo))
        },
        deleteItem:(state,action)=>{
            const newArr=action.payload
            state.cartItems=newArr
            localStorage.setItem("cartData",JSON.stringify(newArr))

        },
        clearCart:(state,action)=>{
            state.cartItems=[]  
            state.resInfo=[]
            localStorage.removeItem("cartData");  
            localStorage.removeItem("resInfo")
  
        }
    }
})
export const {addToCart,deleteItem,clearCart}=cartSlice.actions
export default cartSlice.reducer