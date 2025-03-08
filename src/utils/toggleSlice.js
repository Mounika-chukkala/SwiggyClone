import { createSlice } from "@reduxjs/toolkit";

const toggleSlice=createSlice({
    name:"toggleSlice",
    initialState:{
        searchToggle:false,
        loginToggle:false,
        similarResDishes:{
        isSimilarDish:false,
        city:"",
        resLocation:"",
        resId:"",
        itemId:""
        }
    },
    reducers:{
        toggleSearchBar :(state,action)=>{
                state.searchToggle=!state.searchToggle
        },
        toggleLogin:(state,action)=>{
            state.loginToggle=!state.loginToggle
        },
        setSimilarDish:(state,action)=>{
            state.similarResDishes=action.payload
        },
        resetSimilarDish:(state)=>{
            state.similarResDishes={
                isSimilarDish:false,
                city:"",
                resLocation:"",
                resId:"",
                itemId:""
                }
        }

    }
})
export const {toggleSearchBar,toggleLogin,resetSimilarDish,setSimilarDish}=toggleSlice.actions
export default toggleSlice.reducer