import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { productData } from "../lib/data";

export default function CartItem() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const addToCart = (dessert) => {
    const itemInCart = cart.find((item) => item.id === dessert.id);
    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...dessert, quantity: 1 }]);
    }
    setAddedToCart({ ...addedToCart, [dessert.id]: true });
  };

  const incrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
    if (cart.find((item) => item.id === id)?.quantity === 1) {
      setAddedToCart({ ...addedToCart, [id]: false });
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setAddedToCart({ ...addedToCart, [id]: false });
  };

  const calculateTotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity of items

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmOrder = () => {
    // Clear the cart after confirmation
    setCart([]);
    setAddedToCart({});
    closeModal(); // Close the modal after confirming
  };

  return (
    <div className="bg-pink-100">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold my-8">Desserts</h1>
        <div className="lg:grid-cols-7 md:grid-cols-3 grid-cols-1 grid lg:gap-2 gap-3">
          <div className="lg:col-span-5 md:col-span-2 col-span-1 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-3">
            {productData.map((dessert) => (
              <div key={dessert.id} className="rounded-lg relative">
                <img
                  src={dessert.image}
                  alt={dessert.category}
                  className="w-60 object-cover rounded-lg"
                />
                <div className="my-6">
                  <h1 className="text-xs my-1 text-gray-600">
                    {dessert.category}
                  </h1>
                  <h1 className="text-sm font-semibold ">{dessert.name}</h1>
                  <p className="text-red-700">${dessert.price.toFixed(2)}</p>
                </div>
                <div className="absolute bottom-24 left-12">
                  {addedToCart[dessert.id] ? (
                    <div className="flex items-center px-4 gap-6 py-1 mt-2 bg-red-700 text-black text-sm w-32 rounded-full">
                      <button
                        onClick={() => decrementQuantity(dessert.id)}
                        className="text-white"
                      >
                        <CiCircleMinus size={20} />
                      </button>
                      <span className="text-white">
                        {cart.find((item) => item.id === dessert.id)
                          ?.quantity || 1}
                      </span>
                      <button
                        onClick={() => incrementQuantity(dessert.id)}
                        className="text-white"
                      >
                        <CiCirclePlus size={20} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(dessert)}
                      className="flex gap-2 border border-black text-black bg-white text-sm px-4 py-1 mt-2 rounded-full"
                    >
                      <img src="assets/images/icon-add-to-cart.svg" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-4 rounded-lg lg:col-span-2 col-span-1 h-fit">
            <h1 className="text-red-800 text-2xl font-bold my-4">
              Your Cart {getTotalItems()}
            </h1>{" "}
            {/* Display total items */}
            {cart.length === 0 ? (
              <img
                src="/assets/images/illustration-empty-cart.svg"
                alt="illustration"
                className="relative left-10"
              />
            ) : (
              <ul className="overflow-auto h-80">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-2"
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(item.id)} className="">
                        <CiCircleRemove />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mb-2 mt-8 font-semibold">
              Total: ${calculateTotal()}
            </p>
            <button
              onClick={openModal}
              className="bg-red-800 text-white px-4 py-2 rounded w-full "
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
              <h2 className="text-xl font-bold mb-4">Order Confirmed </h2>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-2"
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(item.id)} className="">
                        <CiCircleRemove />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">Total: ${calculateTotal()}</p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={confirmOrder}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Start New Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
