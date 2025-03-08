import React, { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Discount from "./Discount";
import MenuCard from "./MenuCard"
import { Coordinate } from '../context/contextApi';
import { MenuShimmer } from "./Shimmer";
function RestaurantMenu() {
  const { id } = useParams();
  let mainId = id.split("-").at(-1).replace("rest", "");
  const [MenuData, setMenuData] = useState([]);
  const [resInfo, setResData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [value, setValue] = useState(0);
  const [Imgvalue, setImgValue] = useState(0);
 const {coord:{lat,lng}}=useContext(Coordinate)

  const [topPicksData, setTopPicksData] = useState(null);

  function handlenext() {
    value >= 120 ? "" : setValue((prev) => prev + 35);
  }
  function handleprev() {
    value < 0 ? "" : setValue((prev) => prev - 35);
  }
  function handlenextimg() {
    Imgvalue >= 80 ? "" : setImgValue((prev) => prev + 45);
  }
  function handleprevimg() {
    Imgvalue < 0 ? "" : setImgValue((prev) => prev - 45);
  }

  async function fetchMenu() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );
    let res = await data.json();
    setResData(res?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR)
    let actualMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
setTopPicksData((res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
  data=>data?.card?.card?.title=="Top Picks")[0])
    setMenuData(
      // res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      //   ?.card?.card
      actualMenu
    );
  }
  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <div className="w-full min-h-screen flex justify-center">
     {
      MenuData.length ? (
      <div className="w-[600px] mx-auto pt-4">
        <p className="text-[14px] cursor-pointer">
          <Link to={"/"}>
            <span className=" text-black/60 hover:text-black/80">Home / </span>
          </Link>
          <Link to={"/"}>
            <span className=" text-black/60 hover:text-black/80">
              {resInfo.city} /{" "}
            </span>
          </Link>

          <span className="text-black/80"> {resInfo.name}</span>
        </p>
        <h1 className="font-bold pt-6 text-2xl">{resInfo.name}</h1>

        <div className="w-full h-[206px] p-5 bg-gradient-to-t from-slate-200/80 rounded-3xl pt-3">
          <div className="w-full mx-auto bg-white p-1 h-full rounded-2xl flex-col items-center">
            <div className="flex font-medium items-center gap-2">
              {" "}
              <i className="fi fi-ss-circle-star mt-1 text-lg text-green-600"></i>
              <span> {resInfo.avgRating}</span>
              <span> {resInfo.totalRatingsString} </span>.
              <span> {resInfo.costForTwoMessage} </span>
            </div>
            <p className="font-bold text-orange-400 text-sm">
              {" "}
              {resInfo?.cuisines?.join(" , ")}
            </p>

            <div className="flex gap-2 mt-1">
              <div className="w-[7px] flex flex-col  justify-center   items-center ">
                <div className="w-[8px] h-[8px] bg-gray-300 rounded-full"></div>
                <div className="w-[2px] h-[25px] bg-gray-300"></div>
                <div className="w-[8px] h-[8px] bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1 ">
                <p>
                  Outlet -{" "}
                  <span className="text-gray-400 text-md">
                    {resInfo.locality}
                  </span>
                </p>
                <p>{resInfo.sla?.slaString}</p>
              </div>
            </div>
            <hr className=" mt-3 w-full  border border-gray-200" />
            <div className="flex">
              <p className="text-sm pt-2 pl-2 text-gray-600">
                {resInfo.sla?.lastMileTravelString} Delivery Fees Applicable .
                Delivered & charged by the restaurant
              </p>
            </div>
          </div>
        </div>

        {/*  ends here */}
        <div className="w-full overflow-hidden mt-3">
          <div className="w-full flex justify-between items-center ">
            <h1 className="text-xl font-bold">Deals For You</h1>

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
                    (value > 120 ? "text-gray-400" : "text-black")
                  }
                ></i>
              </div>
            </div>
          </div>
          <div
            style={{ translate: `-${value}%` }}
            className="w-full mx-auto flex  items-center gap-3  duration-300 my-2"
          >
            {discountData.map((data,i) => (
              <Discount data={data} key={i} />
            ))}
          </div>
        </div>

        <h1 className="mx-auto text-center font-bold mt-3 text-gray-400">
          -- MENU --
        </h1>
        {/* search bar */}
        <div className="w-full relative rounded-2xl bg-gray-200">
          <div className="pl-3 py-2 mt-2 font-medium text-sm text-center ">
            Search for dishes
          </div>
          <i className="fi fi-rr-search pt-3 pr-3 absolute right-2 -top-1"></i>
        </div>

{
    topPicksData &&
<div className="w-full overflow-hidden mt-3">
<div className="w-full flex justify-between items-center ">
  <h1 className="text-xl font-bold">{topPicksData.card.card.title}</h1>

  <div className="flex gap-1 ">
    <div
      onClick={handleprevimg}
      className="h-[25px] cursor-pointer rounded-full flex justify-center items-center mt-2 p-2"
    >
      <i
        className={
          `fi fi-rr-arrow-small-left  text-2xl ` +
          (Imgvalue <= 0 ? "text-gray-200" : "text-gray-900")
        }
      ></i>
    </div>
    <div
      onClick={handlenextimg}
      className="h-[25px]  cursor-pointer rounded-full flex justify-center items-center mt-2 p-2"
    >
      <i
        className={
          `fi fi-rr-arrow-small-right  text-2xl ` +
          (Imgvalue > 80 ? "text-gray-400" : "text-black")
        }
      ></i>
    </div>
  </div>
</div>
<div
  style={{ translate: `-${Imgvalue}%` }}
  className="w-full mx-auto flex  items-center gap-3  duration-300 my-2"
>
  {topPicksData.card.card.carousel.map(({creativeId ,dish:{info:{defaultPrice,price}}},i) => (
    <div key={i} className= "h-[270px]  min-w-[250px] relative">
      <img className="w-full h-full" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/"+creativeId} alt=""/>
      <div className="absolute left-3 bottom-4 flex justify-between items-center w-[230px]">
        <p className="text-white font-medium text-xl">₹{defaultPrice/100 || price/100}</p>
        <button className="px-7 py-1 cursor-pointer bg-white text-green-500 rounded-lg font-semibold">Add</button>
      </div>
    </div>
))}
</div>
</div>
}

        <div>
          {MenuData.map(({ card: { card } },i) => (
            <MenuCard card={card} key={i} resInfo={resInfo}/>
          ))}
        </div>
         
      </div>):<MenuShimmer/>
     }
      
    </div>
  );
}





export default RestaurantMenu;
