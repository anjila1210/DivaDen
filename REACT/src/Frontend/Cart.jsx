import React, { createContext, useContext, useReducer } from "react";

// Initial cart state
const initialState = {
  cartItems: [],
  isCartOpen: false,
};

// Reducer function to update state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      return state;
  }
};

// Create Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add product to cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);
