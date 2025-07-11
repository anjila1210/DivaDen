import React, { useRef, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ToastContainer, toast } from "react-toastify";
import API from "../utils/axios";


const products = [
  {
    id: 1,
    name: "Mamaearth Nude lipstick",
    price: "₹182",
    img: "https://m.media-amazon.com/images/I/31B+gAQE0FL._SY300_SX300_.jpg",
  },
  {
    id: 2,
    name: "Biotique Natural Lipstick",
    price: "₹199",
    img: "https://m.media-amazon.com/images/I/41ho6DwQvwL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 3,
    name: "Lakme liquid Lip colour",
    price: "₹349",
    img: "https://m.media-amazon.com/images/I/31AaSYcU48L._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 4,
    name: "Maybelline Creamy Matte",
    price: "₹203",
    img: "https://m.media-amazon.com/images/I/31zOhJYG2FL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 5,
    name: "Mars Creame Matte",
    price: "₹189",
    img: "https://m.media-amazon.com/images/I/31PE1lbzZGL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 6,
    name: "Faces Canada liquid gloss",
    price: "₹249",
    img: "https://m.media-amazon.com/images/I/412SHWUfKEL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 7,
    name: "Faces canada Creamy matte",
    price: "₹399",
    img: "https://m.media-amazon.com/images/I/41mre3mMVOL._SX300_SY300_QL70_FMwebp_.jpg",
  },
];

const ProductSlider = ({setCartItems}) => {
   const containerRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

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

 

  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setShowPrev(container.scrollLeft > 0);
    setShowNext(container.scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= containerRef.current.clientWidth;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += containerRef.current.clientWidth;
  };

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={3000} />
    <section className="relative py-12 bg-pink-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pl-5 text-left">
        Handpicked For You
      </h2>

      {showPrev && (
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md z-10"
          onClick={scrollLeft}
        >
          <KeyboardArrowLeftIcon />
        </button>
      )}

      {showNext && (
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md z-10"
          onClick={scrollRight}
        >
          <KeyboardArrowRightIcon />
        </button>
      )}

      <div
        className="flex gap-5 overflow-x-auto px-5 scroll-smooth scrollbar-hide bg-beige p-4 rounded-xl"
        ref={containerRef}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[300px] h-[450px] bg-white rounded-xl shadow-md text-center hover:scale-95 transition duration-300"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-3/4 object-cover rounded-t-xl"
            />
            <p className="mt-0 font-medium text-gray-800 text-sm">
              {product.name}
            </p>
            <div className="mt-1">
              <p className="text-pink-500 font-semibold text-lg mb-2">
                {product.price}
              </p>
              <button
              onClick={()=>handleAddToCart(product)}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-3 rounded text-sm font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default ProductSlider;
