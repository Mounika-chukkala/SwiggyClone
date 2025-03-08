import React from 'react'

function Discount({
    data: {
      info: { header, couponCode },
    },
  }) {
    return (
      <div className="w-full flex border border-gray-200 rounded-xl gap-2 o p-2 ">
        <i className="fi fi-rr-badge-percent text-4xl p-1 font-extrabold text-orange-500"></i>
        <div className="w-[200px] h-[50px] flex flex-col justify-center">
          <h2 className="text-xl font-bold">{header}</h2>
          <p className="text-sm">{couponCode}</p>
        </div>
      </div>
    );
  }

export default Discount
