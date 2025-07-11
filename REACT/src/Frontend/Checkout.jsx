import React, { useState } from "react";
import ShippingForm from "./Shipping";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartItems, setCartItems }) => {
  const[shippingInfo,setShippingInfo]=useState(null);
  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  type === "inc"
                    ? item.quantity + 1
                    : item.quantity > 1
                    ? item.quantity - 1
                    : 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
const navigate=useNavigate();
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace("₹", ""));
    return total + price * item.quantity;
  }, 0);

  const handlePlaceOrder = async() => {
    if (!shippingInfo || !shippingInfo.fullName) {
      alert("Please fill in the shipping address!");
      return;
    }
  
     const token = localStorage.getItem("token");

  if (!token) {
    alert("User not logged in. Please login first.");
    return;
  }

     const orderData = {
      items: cartItems,
      shippingAddress: shippingInfo,
      totalAmount: totalPrice,
      
    };
     
  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Order placed successfully!");
      setCartItems([]);
      setShippingInfo(null); // 🧹 Empty cart
    } else {
      alert("❌ Failed to place order");
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("❌ Something went wrong!");
  }
};
  return (
    <>
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-black mb-4">Checkout</h1>
    <div className="flex justify-between p-6 bg-gray-100 min-h-screen">
      {/* Left: Cart Items */}
      <div className="w-[65%] space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center bg-white p-4 rounded shadow">
            <img src={item.img} alt={item.name} className="w-24 h-24 object-contain rounded" />
            <div className="ml-6 flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-pink-600 font-bold mt-1">{item.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => updateQuantity(item.id, "dec")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, "inc")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
         <ShippingForm onChange={setShippingInfo} />
      </div>

      {/* Right: Total Price Box */}
      <div className="w-[30%] bg-white p-6 rounded shadow h-fit">
        <h3 className="text-lg font-bold border-b pb-2 mb-4">PRICE DETAILS</h3>
        <div className="flex justify-between text-gray-800 font-semibold text-base">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>
        <button
         onClick={handlePlaceOrder}
        className="mt-6 w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 rounded">
          PLACE ORDER
        </button>

        <button
    onClick={() => navigate("/orders")} // 👈 Navigate to PastOrders page
    className="mt-6 w-full bg-pink-500 text-white hover:bg-pink-400 font-semibold py-2 rounded">PAST ORDERS</button>
      </div>
    </div>
    </div>
    </>
  );
};

export default CheckoutPage;
