import React from 'react'
import DetailMenu from './DetailMenu';
import { useState } from 'react';
function MenuCard({ card,resInfo }) {
    // const [currIdx, setCurrIdx] = useState(0);
    let hello = false;
    if (card["@type"]) {
      hello = true;
    }
    const [isOpen, setIsOpen] = useState(hello);
    function togglefn() {
      // setCurrIdx(i === currIdx ? null : i);
      setIsOpen((prev) => !prev);
    }
    if (card.itemCards) {
      const { title, itemCards } = card;
      return (
        <>
          <div className="my-5">
            <div className="flex justify-between">
              <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "base")}>
                {title} ({itemCards.length})
              </h1>
              <i
                onClick={togglefn}
                className={
                  "fi cursor-pointer text-xl font-bold fi-rr-angle-small-" +
                  (isOpen ? "up" : "down")
                }
              ></i>
            </div>
            <div>
            {isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
  
            </div>
          </div>
          <hr
            className={
              "border-gray-200 my-5 rounded-lg border-" +
              (card["@type"] ? "[6px]" : "[2px]")
            }
          />
        </>
      );
    } else {
      const { title, categories } = card;
      return (
        <div>
          <h1 className="font-bold text-xl my-5">{title}</h1>
  
          {categories.map((data,i) => (
            <MenuCard card={data} key={i} resInfo={resInfo} />
            // <h1>hello</h1>
          ))}
        </div>
      );
    }
  }
  
export default MenuCard
