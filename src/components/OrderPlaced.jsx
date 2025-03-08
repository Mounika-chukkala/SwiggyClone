import React, { useState } from 'react'

function OrderPlaced() {
    const [visible,setVisible]=useState(true);
    function handleVisible(){
setVisible(false);
    }
  return (
    <div className={`bg-green-400 mx-auto my-20 ${!visible?"hidden":""}`}>
      <h1 className='text-white font-bold text-2xl'> Order Placed Succesfully </h1>
      <button  className="text-white border-b-1 border-white text-sm" onClick={handleVisible}>Ok,Continue</button>
    </div>
  )
}

export default OrderPlaced
