import React from "react";
import { ToastContainer, toast } from "react-toastify";
import API from "../utils/axios";
import { useEffect } from "react";

const hairEssentials = [
  {
    id: 1,
    name: "Loreal hair serum",
    price: "₹389",
    img: "https://m.media-amazon.com/images/I/319eWvlIPsL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 2,
    name: "Love beauty and planet shampoo",
    price: "₹160",
    img: "https://m.media-amazon.com/images/I/41QxrnOUonL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 3,
    name: "Mamaearth onion shampoo",
    price: "₹249",
    img: "https://m.media-amazon.com/images/I/31GmRhHnBjL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 4,
    name: "Parachute coconut hair oil",
    price: "₹185",
    img: "https://m.media-amazon.com/images/I/41FSCIMsjZL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 5,
    name: "Loreal Hyaluronic moisturizer hair cream",
    price: "₹278",
    img: "https://m.media-amazon.com/images/I/31tZxWKzP6L._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 6,
    name: "TREsme Shampoo",
    price: "₹549",
    img: "https://m.media-amazon.com/images/I/31zdrgjbToL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 7,
    name: "BBlunt hair mask",
    price: "₹423",
    img: "https://m.media-amazon.com/images/I/31gfzJq6cxL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 8,
    name: "Livon Serum",
    price: "₹168",
    img: "https://m.media-amazon.com/images/I/31H5xl4ytLL._SX300_SY300_QL70_FMwebp_.jpg",
  },
];
const HairEssentials = ({setCartItems}) => {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Hair Essentials</h2>
        <div className="flex flex-wrap gap-5 justify-start">
          {hairEssentials.map((product) => (
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

export default HairEssentials;