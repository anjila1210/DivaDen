import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


const BannerSlider = () => {
  const images = [
    "/Banner/Sliders/best-sellers-swiss-beauty.jpeg.jpg",
    "https://media6.ppl-media.com/tr:dpr-2,dpr-2/mediafiles/ecomm/misc/1703065896_wheat-protien-app-default.jpg",
    "https://m.media-amazon.com/images/S/aplus-media/vc/842d64e1-98ec-4f8b-a86f-77f18da63018.__CR0,0,970,300_PT0_SX970_V1___.jpg",
    "https://www.lakmesalon.in/cdn/shop/collections/Facial_Kit_Inner_banner.jpg?v=1615796746"
  ];
const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.scrollWidth / images.length;
      sliderRef.current.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <main className="my-6">
      <div className="px-4">
        <div
          className="flex items-center gap-2 rounded-md overflow-x-auto overflow-y-hidden scroll-smooth scroll-snap-x snap-mandatory"
          ref={sliderRef}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative min-w-full max-h-[450px] aspect-square rounded-md overflow-hidden snap-start"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-right"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BannerSlider;