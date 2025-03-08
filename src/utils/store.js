import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import authSlice from "./authSlice"
import filterSlice from "./filterSlice"
const store=configureStore({
    reducer:{
         toggleSlice,
   cartSlice,
 filterSlice,
          authSlice
    }
})
export default store;