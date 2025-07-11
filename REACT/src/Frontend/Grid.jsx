import React from "react";
import { useNavigate } from "react-router-dom";
const CollectionGrid = () => {
  const navigate=useNavigate();
  const products = [
    {
      image: "https://www.webspero.com/wp-content/uploads/2022/06/plum_im_case_study_design.webp",
      alt: "Product-1",
      route:"/Plum"
    },
    {
      image: "https://m.media-amazon.com/images/I/81aYJG-uZuL.jpg",
      alt: "Product-2",
      route:"/Plum"
    },
    {
      image: "https://images-static.nykaa.com/media/catalog/product/2/0/20827f4DOTKE00000251_5.jpg?tr=w-500",
      alt: "Product-3",
      route:"/DnK"
    },
    {
      image: "https://aqualogica.in/cdn/shop/files/1_2796fbcf-6a7c-49e3-beb0-115de64deff3.jpg?v=1716983037",
      alt: "Product-4",
      route:"/Aqualogica"
    }
  ];

  return (
    <section className="py-1 bg-pink-100">
      <div className="max-w-7xl mx-auto px-0 ml-2">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 ml-0">Shop Now</h2>
        </div>
      <div className="flex justify-center flex-wrap gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={()=>navigate(product.route)}
             className=" relative text-center p-4 max-w-xs w-full rounded-lg transition-transform hover:scale-95"
                style={{ backgroundColor: "pink", border: "5px solid pink" }}
          >
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-auto rounded-lg mb-4"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base py-2 px-5 rounded">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
