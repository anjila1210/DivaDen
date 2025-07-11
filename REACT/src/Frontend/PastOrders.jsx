import React, { useEffect, useState } from "react";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view your orders.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        alert("Failed to fetch orders.");
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg font-medium">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="p-6 text-center text-xl text-gray-600">No past orders found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Order #{order._id.slice(-6)}</h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold text-gray-700">Shipping Address</p>
                <p className="text-sm text-gray-600 leading-5">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                  {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-700">Total Amount</p>
                <p className="text-lg text-pink-500 font-bold">₹{order.totalAmount}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="font-semibold text-gray-700 mb-2">Items Ordered:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-lg p-2 bg-gray-50"
                  >
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price.replace("₹", "")} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastOrders;
