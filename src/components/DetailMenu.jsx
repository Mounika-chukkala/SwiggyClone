import React from 'react'
import DetailMenuCard from './DetailMenuCard';
function DetailMenu({ itemCards,resInfo }) {


    return (
      <div className=" w-[600px] flex flex-col gap-4 my-3">
        {/* console.log(info) */}
        {itemCards.map(
          ({
            card: {
              info}
          },i) => (
            <DetailMenuCard key={i}  info={info} resInfo={resInfo}/>
          )
        )}{" "}
      </div>
    );
  }

export default DetailMenu
