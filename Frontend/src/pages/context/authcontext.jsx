/* eslint-disable react/prop-types */
// src/pages/context/authcontext.jsx
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null); // Added user state to store user details
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to handle user login (set user details)
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Store user details on login
  };

  // Function to handle user logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user details on logout
  };

  // Function to handle user registration
  const register = () => {
    setIsRegistered(true);
  };

  // Add item to cart
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Remove item from cart by product ID
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.product_id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Reload cart items from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRegistered,
        user, // Provide user details in context
        login,
        logout,
        register,
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Default export retained
