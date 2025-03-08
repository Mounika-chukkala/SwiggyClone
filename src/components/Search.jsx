

import React, { useContext, useEffect, useState } from "react";
import Dishes from "./Dishes";
import Rest from "./Rest";
import { Coordinate } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarDish } from "../utils/toggleSlice";
import { withHoc } from "./Rest";
import { SearchShimmer } from "./Shimmer";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [Restaurant, setRestaurant] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);

const PromotedRes=withHoc(Rest);

  const {
    coord: { lat, lng },
  } = useContext(Coordinate);
const dispatch=useDispatch()
  const {isSimilarDish,city,resLocation,resId,itemId}=useSelector((state)=>state.toggleSlice.similarResDishes)
  // console.log({isSimilarDish,city,resLocation,resId,itemId})

  const FilterOptions = ["Restaurant", "Dishes"];
  const [activeBtn, setActiveBtn] = useState("Dishes");
  function handleFilter(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }
  function handleSearchQuery(e) {
    let newStr = e.target.value.trim();
    if (e.keyCode == 13){
        setSearchQuery(newStr);
            setSelectedResDish(null);
            setDishes([])
    } 
  }

function handleNavigation(){
    setSelectedResDish(null);
    setSimilarResDishes([]);
}

useEffect(()=>{


    if(isSimilarDish){
        fetchSimilarResDish();    
    }
    
},[isSimilarDish])



  async function fetchSimilarResDish() {

    let pathname=`/city/${city}/${resLocation}`
    let encodedPath=encodeURIComponent(pathname)
// console.log(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
// )

    let data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );

    let res = await data.json();
    setSelectedResDish(
      (res?.data?.cards[1]
      )
    );
    setSimilarResDishes(
        (res?.data?.cards[2]?.card?.card?.cards
        )
      );
      dispatch(resetSimilarDish())

  }

  async function fetchDishes() {
    let data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );
    let res = await data.json();
    setDishes(
      (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data) => data?.card?.card?.info
      )
    );
  }
  async function fetchRestData() {
    let data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    
    setRestaurant(
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data) => data?.card?.card?.info
      )
    );
  }
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    // setSearchQuery("")
    fetchDishes();
    fetchRestData();
  }, [searchQuery]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[50%] flex flex-col bg-red my-7 ">
        <div className="flex gap-2 border  items-center ">
          <i
            onClick={handleNavigation}
            className="fi fi-rr-angle-small-left text-2xl mt-2 ml-2 cursor-pointer "
          ></i>
          <input
            onKeyDown={handleSearchQuery}
            className="focus:outline-none 
     py-2 px-3 w-full"
            type="text"
            placeholder="Search for restaurant and food"
          />
          <i
            className="fi fi-rr-search text-xl mt-2 mr-2 cursor-pointer "
          ></i>
        </div>
{ !selectedResDish &&
    <div className="flex gap-2 my-3">
    {FilterOptions.map((filterName,i) => (
      <button key={i}
        onClick={() => handleFilter(filterName)}
        className={
          "fltrbtn cursor-pointer " +
          (activeBtn === filterName ? "active" : "")
        }
      >
        {filterName}
      </button>
    ))}
  </div>
}
          {dishes.length || searchQuery===""?
              (         <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-5 bg-[#f4f5f7]">

                { selectedResDish ?(
                <>
                <div className="my-4 p-4">
                <h1 className="font-bold mb-4">Item Added to cart</h1>
                 <Dishes data={selectedResDish.card.card}/>
                
                 <p className="font-bold mt-4">More dishes from this restaurant</p>
                 </div>
                 <br/>
                 {
                    similarResDishes.map((data,i)=>(
                            <Dishes key={i} data={{...data.card,restaurant:selectedResDish.card.card.restaurant}}/>
                    ))
                } 
                </> 
                )
                :          (activeBtn === "Dishes"
                            ? dishes.map((data,i) => <Dishes data={data.card.card} key={i}/>)
                            : Restaurant.map((data,i) =>(
                              data?.card?.card?.info?.promoted?
                              <PromotedRes data={data} key={i}/> : <Rest data={data} key={i} />
                            ) ))
                            }         </div>
                          ):
                            <SearchShimmer/>
                          
          }

         
            
      </div>
    </div> 
  );
}

export default Search;
