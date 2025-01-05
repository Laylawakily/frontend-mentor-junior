import React from 'react';

function ProductCard({ product, addToCart }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;