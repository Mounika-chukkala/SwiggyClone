import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext, Coordinate, Visibility } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar ,toggleLogin} from "../utils/toggleSlice";
import SignInPage from "./SignInPage";
import { clearCart } from "../utils/cartSlice";
export default function Navbar() {
  
  const navItems = [
    {
      name: "NiteEats Corporate",
      image: <i className="fi fi-rr-shopping-bag mt-1 text-xl"></i>,
      path:"/corporate",
    },
    {
      name: "Search",
      image: <i className="fi fi-rr-search mt-1 text-xl"></i>,
      path:"/search",
    },
    
    {
      name: "Sign In",
      image: <i className="fi fi-rr-user text-xl mt-1"></i>,
      path:"/signin",
    },
    {
      name: "Offers",
      image: <i className="fi fi-rr-badge-percent text-xl mt-1"></i>,
      path:"/offers",
    },
    {
      name: "Help",
      image: <p className=" text-xl m-1">?</p>,
      path:"/help",
    },
    {
      name: "Cart",
      image: <i className="fi fi-rr-shopping-cart text-xl mt-1"></i>,
      path:"/cart",
    },
  ];
  const [searchResult, setSearchResult] = useState([]);
  // const { visible, setVisible } = useContext(Visibility);
  
  const  visible=useSelector((state)=>state.toggleSlice.searchToggle)
  const loginVisible=useSelector((state)=>state.toggleSlice.loginToggle)

const dispatch=useDispatch()
const navigate=useNavigate()
  // const { cartData, setCardData} = useContext(CartContext);
  const cartData=useSelector((state)=>state.cartSlice.cartItems)
  const userData=useSelector((state)=>state.authSlice.userData)

  const { setCoord } = useContext(Coordinate);
  const [Address, setAddress] = useState("Mumbai");
  // function handleSearch(){
  //    setVisible(prev=>!prev);
  // }
  function handleVisibility() {
    // setVisible((prev) => !prev);
    dispatch(toggleSearchBar())

  }
  function handleLogin() {
    // setVisible((prev) => !prev);
  dispatch(toggleLogin())

 
  }
  async function searchResultFun(city) {
    if (city === "") return;
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${city}`
    );
    const data = await res.json();
    setSearchResult(data.data);
  }
  async function fetchLatLong(id) {
    if (id == "") return;
    // console.log(hello")
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();
    // console.log(data.data[0].geometry.location.lat)
    // console.log(data.data[0].geometry.location.lng)
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    });

    setAddress(data.data[0].formatted_address);
    // setVisible(prev=>!prev)
    dispatch(clearCart());
    navigate("/");      // Only navigates after data fetch

    handleVisibility();


  }
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
    <div className="w-full">  
        <div
          onClick={handleVisibility}
          className={
            "w-full absolute z-30 h-full bg-black/50 " +
            (visible ? "visible" : "invisible")
          }
        >
          {" "}
        </div>
        <div
          className={
            "bg-white w-[35%] h-full flex justify-end p-2 z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="w-[60%] flex flex-col  mr-3">
            <i className="fi fi-br-cross mt-4" onClick={handleVisibility}></i>
            <input
              type="text"
              placeholder="Search for area,street names"
              className="p-2 border border-gray-200 my-2 focus:outline-none focus:shadow-lg"
              onChange={(e) => searchResultFun(e.target.value)}
            />
            <div className=" p-1">
              <ul>
                {searchResult.map((data,index) => {
                  const isLast=(index===searchResult.length-1);
                  return (<div key={index} className="flex gap-2   p-1 text-sm ">
                    <i className="fi fi-rr-marker mt-2 text-xl  text-gray-400 font-light"></i>
                    <li
                      onClick={() => fetchLatLong(data.place_id)}
                      className="cursor-pointer"
                    >
                      <h1 className="font-medium text-sm line-clamp-1">
                        {data.structured_formatting.main_text}
                      </h1>
                      <p className="font-light line-clamp-1 text-gray-400">
                        {data.structured_formatting.secondary_text}
                      </p>
                      {!isLast &&<p className="opacity-35">-------------------------------------------------</p>}
                    </li>
                  </div>)
})}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*hello------------------------  */}
      <div className="w-full ">
        <div
          onClick={handleLogin}
          className={
            "w-full absolute z-30 h-full bg-black/50 " +
            (loginVisible ? "visible" : "invisible")
          }
        >
          {" "}
        </div>
        <div
          className={
            "bg-white w-[25%] h-full flex  p-2 z-40 absolute duration-500 " +
            (loginVisible ? "right-0" : "-right-[100%]")
          }
        >
          <div className="w-full flex flex-col  m-3">
            <i className="cursor-pointer fi fi-br-cross mt-4" 
            onClick={handleLogin}
            ></i>
        <SignInPage/>
          </div>
        </div>
      </div>

      {/* hellow------------------------- */}
    <div className="relative w-full">
      
      <div className="w-full sticky top-0 bg-white z-10 h-16 flex justify-center items-center shadow-md">
        <div className="w-[70%] flex justify-between items-center">
          <div className="w-[40%] py-2 flex justify-center items-center gap-3">
            <Link to={"/"}>
              <img className="w-20 text-xl font-bold text-orange-500" src="src/assets/NiteEats.svg" alt="NiteEats" />
              {/* <svg className="VXJlj" viewBox="0 0 61 61" height="49" width="49">
                <g clipPath="url(#a)">
                  <path
                    fill="#FF5200"
                    d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.32.5h60v60h-60z"></path>
                  </clipPath>
                </defs>
              </svg> */}
            </Link>
            <div
              className="flex justify-center items-center gap-1 cursor-pointer"
              onClick={handleVisibility}
            >
              <p className="font-bold border-b-2 border-black p-1"> Others </p>
              <span className="text-sm text-gray-300 line-clamp-1 max-w-[220px]">
                {Address}
              </span>
              <i className="fi fi-rs-angle-small-down pt-2 text-2xl text-orange-500"></i>
            </div>
          </div>
          <div  className=" w-[75%] flex  justify-between  items-center">
            {
            navItems.map((data, i) => (
              data.name=="Sign In"?
              <div key={i} className="cursor-pointer" onClick={handleLogin}>
              <div className="flex  items-center gap-1" key={i}>
                {/* <p>{console.log(userData?.photo)}</p> */}
                { userData? <img src={userData.photo} className="rounded-3xl w-[25px]" alt="img"/>:data.image}
                <p className="text-[15px]">{userData?userData.name :data.name}</p>
              
              
              </div>
              
              </div>
            :

              <Link to={data.path}>
              <div  className=" flex  items-center gap-1" key={i}>
                {data.image}
                <p className="text-[15px]">{data.name}</p>
              
              {data.name==="Cart" && <p className="text-orange-600">{cartData?.length}</p> }
              
              </div>
              
              </Link>

            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    
    </div>

  );
}
