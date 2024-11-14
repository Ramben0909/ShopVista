/* eslint-disable react/prop-types */
// src/pages/context/authcontext.jsx
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null); // Added user state to store user details
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to handle user login (set user details)
  const login = (token,userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Store user details on login
    setToken(token);


    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  // Function to handle user logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);  // Clear user details on logout
    setToken(null);
  
    // Clear cart items and token/user from localStorage
    setCartItems([]);  // Reset the cart state
    localStorage.removeItem('cartItems');  // Remove cart data from localStorage
    localStorage.removeItem('user');  // Remove user details from localStorage
    localStorage.removeItem('token');  // Remove token from localStorage
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
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));  // Rehydrate user data from localStorage
      setToken(savedToken);  // Rehydrate token from localStorage
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRegistered,
        user, // Provide user details in context
        token,
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
