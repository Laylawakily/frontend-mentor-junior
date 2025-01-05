import React from 'react';

function Cart({ cart, removeFromCart }) {
  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="flex justify-between items-center p-2 border-b">
            <span>{item.name}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;