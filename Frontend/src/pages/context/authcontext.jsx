// src/pages/context/authcontext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// AuthProvider component to manage the auth context
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to handle user login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Function to handle user registration
  const register = () => {
    setIsRegistered(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isRegistered, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
