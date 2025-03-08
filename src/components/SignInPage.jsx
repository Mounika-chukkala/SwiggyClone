import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, removeUserData } from '../utils/authSlice';
import { useNavigate } from 'react-router-dom';
import { toggleLogin } from '../utils/toggleSlice';

function SignInPage() {
    const userData=useSelector((state)=>state.authSlice.userData)

    const dispatch=useDispatch();
    const navigate=useNavigate();
  async function handleAuth(){
   let data=await signInWithPopup(auth,provider)
//    console.log("Auth object:", auth);
// console.log("Firebase App:", auth.app);
// console.log(data)  
const userData={
    name:data.user.displayName,
     photo:data.user.photoURL
}
dispatch(toggleLogin())

dispatch(addUserData(userData))
navigate("/")
}

async function handleLogOut() {
    await signOut(auth);
    dispatch(removeUserData())
dispatch(toggleLogin())
}
    return (
    <div>
            
          {
    userData ?
    <>
    <div className="w-full flex  items-center justify-between my-2 ">
        
                <h1 className="text-3xl  font-bold">Log Out</h1>
              <img className="w-[100px] rounded-3xl" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
            <button onClick={handleLogOut} className="w-[90%] p-4 bg-amber-500 text-white text-center cursor-pointer "> Log out</button>   
            <p className="text-xs mt-2 opacity-70">By clicking on Log out, You can not place an order</p>
           </>

:
<><div className="w-full flex items-center  justify-between my-2 ">
              <div >
                <h1 className="text-3xl font-bold">Login</h1>
                <p className=" text-xs text-orange-400 mt-2">Sign up with Google</p>
              </div>
              <img className="w-[100px] rounded-3xl" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
<button onClick={handleAuth} className="w-[90%] p-4 bg-amber-500 text-white cursor-pointer text-center">Login with Google</button>
          <p className="text-xs mt-2 opacity-70">By clicking on Login,I accept the Terms & Conditions and privacy policy </p>
          </>
}

    </div>
  )
}

export default SignInPage
