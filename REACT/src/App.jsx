import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Common Components
import HeaderWithAuth from "./Frontend/Navbar";
import BannerSlider from "./Frontend/Banners";
import TopBrands from "./Frontend/Exclusives";
import CollectionGrid from "./Frontend/Grid";
import MakeupEssentials from "./Frontend/MakeUp";
import HairEssentials from "./Frontend/HairEssesntial";
import SkinEssentials from "./Frontend/Sunscreen";
import ProductSlider from "./Frontend/Handpicked";
import Footer from "./Frontend/Footer";

// Brand Pages
import Aqualogica from "./Frontend/Aqualogica";
import Cetaphil from "./Frontend/Cetaphil";
import Plum from "./Frontend/Plum";
import Derma from "./Frontend/Derma";
import DnK from "./Frontend/DnK";
import Caffiene from "./Frontend/Caffiene";
import PastOrders from "./Frontend/PastOrders";

import CartSidebar from "./Frontend/CartSidebar";
import CheckoutPage from "./Frontend/Checkout";

function HomePage({cartItems,toggleCart,setCartItems}) {
  return (
    <>
      <HeaderWithAuth cartItems={cartItems} toggleCart={toggleCart} />
      <BannerSlider />
      <TopBrands />
      <CollectionGrid />
      <MakeupEssentials setCartItems={setCartItems}/>
      <HairEssentials setCartItems={setCartItems} />
      <ProductSlider setCartItems={setCartItems}/>
      <SkinEssentials setCartItems={setCartItems}/>
      <Footer />
    </>
  );
}

function App() {
   const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen)
  return (
    <>
    <Routes>
      <Route path="/"
       element={<HomePage
       cartItems={cartItems}
       toggleCart={toggleCart}
       setCartItems={setCartItems} />} />
      <Route path="/Plum" 
      element={<Plum setCartItems={setCartItems}/>}
       />
      <Route path="/Aqualogica" 
      element={<Aqualogica setCartItems={setCartItems}/>}
       />
      <Route path="/Cetaphil"
       element={<Cetaphil setCartItems={setCartItems} />} 
       />
      <Route path="/Derma" 
      element={<Derma setCartItems={setCartItems} />}
       />
      <Route path="/DnK"
       element={<DnK setCartItems={setCartItems}/>}
        />
      <Route path="/Caffiene" 
      element={<Caffiene setCartItems={setCartItems}/>}
      />
      <Route path="/Checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>}
      />
      <Route path="/orders" element={<PastOrders />} />
      
    </Routes>

    <CartSidebar
        cartItems={cartItems}
        isOpen={isCartOpen}
        toggleCart={toggleCart}
      />
      </>
  );
}

export default App;
