// src/pages/DummyProfile.jsx
import React, { useEffect } from 'react';
import { useAuth } from './context/useAuth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Layout from '../components/layout/layout';

function DummyProfile() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Redirect to login page after logout
  };

  // Only render the profile page if the user is authenticated
  if (!isAuthenticated) {
    return null; // Optionally render nothing here, as user will be redirected
  }

  return (
    <Layout>
      <div style={styles.profileContainer}>
        <h1>Dummy Profile</h1>
        <p>This is a placeholder profile page for demonstration purposes.</p>

        {/* User Info */}
        <div style={styles.profileInfo}>
          <h2>Personal Information</h2>
          <ul>
            <li><strong>Name:</strong> John Doe</li>
            <li><strong>Email:</strong> johndoe@example.com</li>
            <li><strong>Username:</strong> johndoe123</li>
            <li><strong>Member Since:</strong> January 2024</li>
          </ul>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </Layout>
  );
}

const styles = {
  profileContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  profileInfo: {
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  }
};

export default DummyProfile;
