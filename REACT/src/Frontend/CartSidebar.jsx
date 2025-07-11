import React from "react";
import { useNavigate } from "react-router-dom";
const CartSidebar = ({ cartItems, isOpen, toggleCart }) => {
  const navigate=useNavigate();
   const handleCheckout = () => {
    toggleCart(); // close sidebar
    navigate("/checkout"); // navigate to checkout page
  };


  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white z-50 transition-transform duration-300 ease-in-out shadow-lg ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">
          Shopping Bag ({cartItems.length})
        </h2>
        <button onClick={toggleCart} className="text-2xl font-bold text-pink-500">
          &times;
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your bag is empty 👜</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center mb-4 border-b pb-3"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-md font-medium">{item.name}</h3>
                <p className="text-md text-pink-500">{item.price}</p>
              </div>
              <span className="text-md text-pink-500">x{item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t sticky bottom-0 bg-white">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span>Total:</span>
          <span>₹
            {
               cartItems.reduce((total, item) => {
          const price = parseInt(item.price.replace("₹",""));
          const quantity = Number(item.quantity);
          return total + (price * quantity);
        }, 0).toFixed(2)
            }
          </span>
        </div>
        <button
        onClick={handleCheckout}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded text-sm font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
