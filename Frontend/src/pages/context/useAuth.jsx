// useAuth.js (or useAuth.jsx)
import { useContext } from 'react';
import AuthContext from './authcontext.jsx'; // Import the context

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
