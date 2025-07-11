import React, { useState, useRef } from "react";
import Slider from "React-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";

const TopBrands = () => {
  const navigate=useNavigate();
  const brandLogos = [
    {
      image: "/Banner/Aqualogica/banner.jpg",
      route: "/Aqualogica"
    },
    {
      image: "/Banner/Derma Co/banner.jpg",
      route: "/Derma"
    },
    {
      image: "/Banner/Cetaphil/download (3).jpg",
      route: "/Cetaphil"
    },
    {
      image: "/Banner/Dot and Key/Banner.jpg",
      route: "/DnK"
    },
    {
      image: "/Banner/mCaffiene/Banner.jpg",
      route: "/Caffiene"
    },
    {
      image: "/Banner/Plum/Banner.jpg",
      route: "/Plum"
    }
  ];

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = brandLogos.length;
  const slidesToShow = 3;

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute left-0 z-10 top-1/2 transform -translate-y-1/2 text-3xl text-pink-600 bg-white rounded-full p-2 shadow ${
        currentSlide === 0 ? "hidden" : ""
      }`}
    >
      <KeyboardArrowLeftIcon />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute right-0 z-10 top-1/2 transform -translate-y-1/2 text-3xl text-pink-600 bg-white rounded-full p-2 shadow ${
        currentSlide >= totalSlides - slidesToShow ? "hidden" : ""
      }`}
    >
      <KeyboardArrowRightIcon />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 3,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-5 bg-pink-100 relative">
      <div className="max-w-7xl mx-auto px-0">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Exclusives</h2>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {brandLogos.map((brand, index) => (
            <div key={index} className="p-4">
              <div
                className="text-center p-2 rounded-lg transition-transform hover:scale-95"
                style={{ backgroundColor: "pink", border: "5px solid pink" }}
                onClick={()=>navigate(brand.route)}
              >
                <img
                  src={brand.image}
                  alt={`Brand ${index + 1}`}
                  className="w-4/5 h-auto mx-auto rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>
    </section>
  );
};

export default TopBrands;
