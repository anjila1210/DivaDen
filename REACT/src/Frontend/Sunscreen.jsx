import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import API from "../utils/axios";
const skinEssentials = [
  {
    id: 1,
    name: "Derma-co 1% hyaluronic sunscreen",
    price: "₹478",
    img: "https://m.media-amazon.com/images/I/51x3cj+-iUL._SX522_.jpg",
  },
  {
    id: 2,
    name: "Dot and Key Sunscreen",
    price: "₹378",
    img: "https://m.media-amazon.com/images/I/515qmIG0GoL._SX522_.jpg",
  },
  {
    id: 3,
    name: "Lacto Calamine Sunscreen",
    price: "₹139",
    img: "https://m.media-amazon.com/images/I/31iF+OeSfUL._SY300_SX300_.jpg",
  },
  {
    id: 4,
    name: "DeConstruct Sunscreen",
    price: "₹331",
    img: "https://m.media-amazon.com/images/I/51VLdPNtSWL._SX522_.jpg",
  },
  {
    id: 5,
    name: "Minimalist Sunscreen",
    price: "₹379",
    img: "https://m.media-amazon.com/images/I/41YdhlLCE4L._SX522_.jpg",
  },
  {
    id: 6,
    name: "Neutrogen UltraSheer Sunscreen",
    price: "₹491",
    img: "https://m.media-amazon.com/images/I/51ZLAooqDOL._SX522_.jpg",
  },
  {
    id: 7,
    name: "Lakme Sunscreen",
    price: "₹182",
    img: "https://m.media-amazon.com/images/I/41F3JLZxV8L._SX522_.jpg",
  },
  {
    id: 8,
    name: "Aroma-Magic Sunscreen",
    price: "₹165",
    img: "https://m.media-amazon.com/images/I/61W+Q-asduL._SX522_.jpg",
  },
];
const SkinEssentials = ({setCartItems}) => {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Sun Protection</h2>
        <div className="flex flex-wrap gap-5 justify-start">
          {skinEssentials.map((product) => (
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

export default SkinEssentials;