// src/App.jsx
import React, { useState } from "react";
import items from "./item";
import CartItem from "./Product/CartItem";
import { IoIosCloseCircleOutline } from "react-icons/io";


function App() {
  const [cart, setCart] = useState({}); // Stores cart items with prices and quantities

  // Add Item to Cart
  const handleAddToCart = (item, count) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: {
        ...item,
        count,
        totalPrice: (item.price * count).toFixed(2),
      }, // Format totalPrice to 2 decimal places
    }));
  };

  // Update Item Quantity in Cart
  const handleUpdateCart = (item, count) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (count > 0) {
        updatedCart[item.id] = {
          ...item,
          count,
          totalPrice: (item.price * count).toFixed(2),
        }; // Format totalPrice
      } else {
        delete updatedCart[item.id];
      }
      return updatedCart;
    });
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  // Calculate Total Cart Price
  const calculateTotalPrice = () => {
    return Object.values(cart)
      .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
      .toFixed(2);
  };

  return (
    <div className=" bg-gray-300 grid grid-cols-4 max-w-6xl mx-auto mt-12">
      {/* Left Section - Cart Items */}
      <div className="flex flex-wrap gap-4 col-span-3">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>

      {/* Right Section - Cart Summary */}

      <div className="w-72 h-80 bg-white p-4 border-l shadow-lg">
      {/* <h2 className="text-2xl text-[#c03d1d] font-bold mb-4">Your Cart</h2> */}

        {Object.keys(cart).length > 0 ? (
          <ul>
            {Object.values(cart).map(({ id, category, count, totalPrice }) => (
              <li
                key={id}
                className="flex  flex-col justify-between border-b py-2"
              >

                <div className="flex items-center justify-between gap-2">
                  <span>{category}</span>
                  <button
                    onClick={() => handleRemoveFromCart(id)}
                    className="text-[#ab7c6f97] hover:text-[#723626]"
                  >
                    <IoIosCloseCircleOutline size={20}/>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="">x{count}</span>
                  <span className="text-green-500 font-bold">
                    ${totalPrice}
                  </span>{" "}
                  {/* Display formatted price */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
         <>
         <div>
         <h2 className="text-2xl text-[#c03d1d] font-bold mb-4">Your Cart 0</h2>
          <img src="  /assets/images/illustration-empty-cart.svg"/>
         </div>
         </>
        )}

        {/* Total Price */}
        <div className="mt-4 font-bold text-xl text-right">
          <span>Total Price: ${calculateTotalPrice()}</span>{" "}
          {/* Display formatted total price */}
        </div>
      </div>
    </div>
  );
}

export default App;
