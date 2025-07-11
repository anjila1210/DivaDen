import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import API from '../utils/axios';
const products = [
  {
    id: 1,
    img: "https://images-static.nykaa.com/media/catalog/product/8/d/8d9e9d86902395722434_1.jpg",
    name: "Maybelline Fit-me foundation",
    price: "₹217",
  },
  {
    id: 2,
    img: "https://m.media-amazon.com/images/I/41wvyueMV8L._SY300_SX300_QL70_FMwebp_.jpg",
    name: "Insight Concealer Pallete",
    price: "₹269",
  },
  {
    id: 3,
    img: "https://m.media-amazon.com/images/I/211hx20CmNL._SX300_SY300_QL70_FMwebp_.jpg",
    name: "Lakme Radiance Cream",
    price: "₹306",
  },
  {
    id: 4,
    img: "https://m.media-amazon.com/images/I/61k1y5Z5S4L._SX522_.jpg",
    name: "Mars BB Cream",
    price: "₹249",
  },
  {
    id: 5,
    img: "https://m.media-amazon.com/images/I/41KZDITNQnL._SX300_SY300_QL70_FMwebp_.jpg",
    name: "Faces Canada Compact",
    price: "₹129",
  },
  {
    id: 6,
    img: "https://m.media-amazon.com/images/I/517qfWN3MPL._SX679_.jpg",
    name: "BlueHeaven make-up fixer spray",
    price: "₹171",
  },
  {
    id: 7,
    img: "https://m.media-amazon.com/images/I/41Fy+cBLp4L._SY300_SX300_.jpg",
    name: "Insight Highlighter",
    price: "₹89",
  },
  {
    id: 8,
    img: "https://m.media-amazon.com/images/I/51pkef+r3QL._SX522_.jpg",
    name: "Lakme Blush",
    price: "₹250",
  },
];

const MakeupEssentials = ({setCartItems}) => {
   const handleAddToCart = async (product) => {
     setCartItems((prev) => {
       const existingItem = prev.find((item) => item.id === product.id);
       if (existingItem) {
         return prev.map((item) =>
           item.id === product.id
             ? { ...item, quantity: item.quantity + 1 }
             : item
         );
       } else {
         toast.success(`${product.name} is added to the cart!`);
         return [...prev, { ...product, quantity: 1 }];
       }
     });
   
     // ✅ Sync with backend
     try {
       await API.post('/cart/add', {
         productId: product.id.toString(),
         name: product.name,
         price: parseInt(product.price.replace(/[^\d]/g, '')),
         image: product.img,
         quantity: 1,
       });
     } catch (err) {
       console.error('Error syncing with backend:', err.response?.data || err.message);
     }
   };
   useEffect(() => {
     const fetchCartItems = async () => {
       try {
         const res = await API.get("/cart");
         setCartItems(res.data.items || []);
       } catch (err) {
         console.error("Error fetching cart items:", err.response?.data || err.message);
       }
     };
   
     fetchCartItems();
   }, []);
   
   const handleRemoveItem = async (productId) => {
     try {
       const res = await API.delete(`/cart/remove/${productId}`);
       setCartItems(res.data.items); // Update local UI
       toast.success("Item removed from cart!");
     } catch (err) {
       console.error("Error removing item:", err.response?.data || err.message);
     }
   };
  return (
    <>
    <ToastContainer position="bottom-right" autoClose={3000} />
    <section className="py-12 bg-pink-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">MakeUp Base Essentials</h2>
        <div className="flex flex-wrap gap-5 justify-start">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[22%]  rounded-lg p-4 ml-4 text-center transition-transform duration-300 hover:scale-95"
              style={{ backgroundColor: "pink", border: "5px solid pink" }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-4/5 mx-auto rounded-lg mb-3 transition-transform duration-300 hover:scale-95"
              />
              <p className="text-xl text-black mb-2">{product.name}</p>
              <div className="text-center">
                <p className="text-lg font-semibold text-pink-500 mb-2">{product.price}</p>
                <button
                onClick={()=>handleAddToCart(product)}
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded font-semibold text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default MakeupEssentials;
