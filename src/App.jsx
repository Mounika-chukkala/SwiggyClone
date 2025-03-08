import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Search from "./components/Search"
import RestaurantMenu from "./components/RestaurantMenu";
import { CartContext, Coordinate, Visibility } from "./context/contextApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignInPage from "./components/SignInPage";
function App() {
  // const [visible,setVisible]=useState(false);
const [coord,setCoord] = useState({lat:18.9690247,lng:72.8205292})
//  const [cartData,setCartData]=useState([])
const visible=useSelector((state)=>state.toggleSlice.searchToggle)
//  function get_data_from_local(){
//   let data=JSON.parse(localStorage.getItem("cartData"))||[]
//   setCartData(data)
//  }
// useEffect(()=>{
//   get_data_from_local();
// },[])
return (
  // <CartContext.Provider value={{cartData,setCartData}}>
    <Coordinate.Provider value={{coord,setCoord}}>
    {/* <Visibility.Provider value={{visible,setVisible}}> */}
        
    <div className={visible?"overflow-hidden max-h-screen":""}>
    <Routes>
        <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Body />}></Route>
        <Route path="/restaurantMenu/:id" element={<RestaurantMenu />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/search" element={<Search/>}></Route>

        {/* <Route path="/signin" element={<SignInPage/>}></Route> */}

        {/* <Route path="/corporate" element={<h1>coming soon</h1>}></Route>
        <Route path="/signin" element={<h1>coming soon</h1>}></Route>
        <Route path="/offers" element={<h1>coming soon</h1>}></Route>
        <Route path="/help" element={<h1>coming soon</h1>}></Route> */}
<Route path="*" element={<h1>Hello</h1>}></Route>
      </Route>
    </Routes>
    </div>
    {/* </Visibility.Provider> */}
    </Coordinate.Provider>
    // </CartContext.Provider>
  );
}

export default App;
