// src/components/CartItem.jsx
import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

const CartItem = ({ item, onAddToCart, onUpdateCart, onRemoveFromCart }) => {
  const [isBought, setIsBought] = useState(false); // Toggle Buy/Counter
  const [count, setCount] = useState(1); // Quantity Counter

  const handleBuy = () => {
    setIsBought(true);
    onAddToCart(item, count);
  };

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
    onUpdateCart(item, count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      onUpdateCart(item, count - 1);
    } else {
      setIsBought(false);
      onRemoveFromCart(item.id); // Remove if count hits 0
    }
  };

  return (
    <div className="relative w-64">
      <div
        style={!isBought ? { border: "none" } : { border: "3px solid",borderColor:"#b73105" } }
        className="rounded-lg"
      >
        <img src={item.image} alt={item.name} className="rounded-lg" />
        <div className="absolute bottom-[5.5rem] left-14 rounded-full w-[9.4rem]">
          {!isBought ? (
            <button
              onClick={handleBuy}
              className=" flex items-center w-full px-5 gap-3 bg-white rounded-full py-[0.4rem] text-sm border border-[#55352a] hover:border-[#b73105]"
            >
              <img
                src="/assets/images/icon-add-to-cart.svg"
                alt="con-add-to-car"
              />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-10 bg-[#b73105] rounded-full py-[0.4rem]">
              <button
                onClick={handleDecrease}
                className="border border-white text-white hover:text-[#b73105] hover:bg-white rounded-full"
              >
                <FiMinus size={14} />
              </button>
              <span className="text-white">{count}</span>
              <button
                onClick={handleIncrease}
                className="border border-white text-white hover:text-[#b73105] hover:bg-white rounded-full"
              >
                <GoPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xs ">{item.category}</h2>
        <h3 className="text-sm mt-1 ">{item.name}</h3>
        <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
