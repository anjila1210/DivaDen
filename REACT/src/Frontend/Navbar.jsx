import React, { useState,useEffect,useRef } from "react";
import StoreIcon from "@mui/icons-material/Store";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LockIcon from "@mui/icons-material/Lock";
import { toast, ToastContainer } from "react-toastify";
import API from "../utils/axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderWithAuth = ({ cartItems, toggleCart }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userName, setUserName] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const dropdownRef = useRef(); 

   useEffect(() => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  if(token){
  setIsLoggedIn(true);
  setUserName(name);
  }
}, []);

 useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isSignup && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (isSignup) {
        const res = await API.post("/auth/signup", {
          name: email.split("@")[0], // Example: use email prefix as name
          email,
          password,
        });
        toast.success("Signup successful!");

         const loginRes = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("userName", loginRes.data.user.name);
      setIsLoggedIn(true);
       setUserName(loginRes.data.user.name);
      } else {
        await API.post("/auth/login", { email, password });
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
         localStorage.setItem("userName", res.data.user.name)
        setIsLoggedIn(true);
         setUserName(res.data.user.name);
      }
       setShowForm(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    } catch (err) {
      const message = err.response?.data?.error || "Authentication failed";
      toast.error(message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setShowUserMenu(false);
    toast.success("Logged out successfully");
  };

//DropDown content
  const categories = [
    { title: "Makeup", items: ["Face Primer", "Foundation", "Blush"] },
    { title: "Skin", items: ["Moisturizer", "Serum", "Face Pack"] },
    { title: "Hair", items: ["Hair Shampoo", "Hair Oil", "Hair Mask"] },
    { title: "Body Care", items: ["Body Soap", "Body Lotion", "Body Oil"] },
    { title: "Fragrance", items: ["Body Mist", "Perfumes", "Deodrants"] },
    { title: "Eyes", items: ["Kajal", "Eyeliner", "Mascara"] },
  ];

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {/* Pink Top bar */}
      <nav className="bg-pink-500 text-white text-sm px-4 py-2 relative">
        <p className="font-medium text-center">
          Get Your Daily Dose of Amazing Deals
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <MobileScreenShareIcon /> <p>Get App</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <StoreIcon /> <p>Store and Events</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <CardGiftcardIcon /> <p>Gift Card</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <QuestionMarkIcon /> <p>Help</p>
          </div>
        </div>
      </nav>

      {/* Navbar */}
      <nav className="bg-white px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <img
              src="/Banner/Sliders/a-logo-for-a-beauty-e-commerce-website-named-divad-EQHDH97-QUiW4RBs00XTSA-HYye6mASRrORrOhIdCWIhA.jpeg"
              alt="DivaDen"
              className="w-28"
            />
            <div className="hidden md:flex gap-6 mt-2 items-center">
              <ul className="flex gap-6 px-6 py-3 ml-[16px]">
                {categories.map((cat, idx) => (
                  <li key={idx} className="relative group">
                    <a className="text-gray-800 font-semibold px-3 py-2 group-hover:text-pink-500">
                      {cat.title}
                    </a>
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg z-10 w-52 p-3">
                      <ul>
                        {cat.items.map((item, i) => (
                          <li key={i} className="my-2">
                            <a className="text-gray-700 hover:text-pink-500 block">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         {/*Search Bar*/}
          <div className="flex items-center gap-4">
            <div className="flex border rounded overflow-hidden">
              <input
                type="search"
                placeholder="Search on DivaDen"
                className="px-4 py-2 text-sm outline-none"
              />
              <button className="bg-pink-500 text-white px-3 flex items-center">
                <SearchIcon />
              </button>
            </div>
          {/*Login button*/}
          {isLoggedIn ? (
          <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-pink-600 hover:text-pink-400"
                >
                  <AccountCircleIcon fontSize="large" />
                </button>

                  {showUserMenu && (
                  <div className="absolute right-0 top-full bg-white border shadow-lg rounded mt-2 z-20 w-40">
                    <div className="p-3 text-sm text-gray-700 border-b font-semibold">
                      Hello, {userName}
                    </div>
                    <button
                      onClick={handleLogout}
              className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-pink-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ):(
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-pink-400"
              onClick={() => setShowForm(true)}
            >
              Login
            </button>
          )}
            <div className="relative">
              <button
                onClick={toggleCart}
                className="bg-pink-500 text-white p-2 rounded hover:bg-pink-400"
              >
                <ShoppingBagIcon />
              </button>
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-pink-500 border border-pink-500 text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md font-semibold">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Form Modal */}
      {showForm && (
        <section className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white max-w-sm w-full p-6 rounded-lg relative">
            <button
              className="absolute top-3 right-4 text-xl text-gray-700"
              onClick={() => setShowForm(false)}
            >
              <CloseIcon />
            </button>

            <form onSubmit={handleAuth} className="space-y-5">
              <h2 className="text-center text-xl font-semibold text-gray-800">
                {isSignup ? "Sign up" : "Login"}
              </h2>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-10 py-2 border rounded"
                />
                <EmailIcon className="absolute left-3 top-3 text-pink-400" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? "Create Password" : "Enter your password"}
                  required
                  className="w-full px-10 py-2 border rounded"
                />
                <LockIcon className="absolute left-3 top-3 text-pink-400" />
                {showPassword ? (
                  <RemoveRedEyeIcon
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  />
                )}
              </div>

              {isSignup && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full px-10 py-2 border rounded"
                  />
                  <LockIcon className="absolute left-3 top-3 text-pink-400" />
                  {showConfirmPassword ? (
                    <RemoveRedEyeIcon
                      onClick={() => setShowConfirmPassword(false)}
                      className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowConfirmPassword(true)}
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                    />
                  )}
                </div>
              )}

              <button
                type="submit"
                className="bg-pink-400 text-white py-2 rounded w-full font-semibold"
              >
                {isSignup ? "Sign up Now" : "Login Now"}
              </button>

              <p className="text-xs text-center">
                {isSignup ? (
                  <>
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSignup(false);
                      }}
                      className="text-pink-400 hover:underline"
                    >
                      Login
                    </a>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSignup(true);
                      }}
                      className="text-pink-400 hover:underline"
                    >
                      Sign up
                    </a>
                  </>
                )}
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default HeaderWithAuth;
