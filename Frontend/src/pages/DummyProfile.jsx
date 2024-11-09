// src/pages/DummyProfile.jsx
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/useAuth'; // Import useAuth hook
import Layout from '../components/layout/layout';
import { toast } from 'react-toastify';

function DummyProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state to handle loading effect

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setLoading(false); // Stop loading when user is authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    toast.error('Failed to load user data. Please try again.');
    return <div>Error loading profile data.</div>;
  }

  return (
    <Layout title="Profile">
      <div style={styles.profileContainer}>
        <h1>Profile</h1>
        <p>This is the user&apos;s profile page.</p>

        {/* Display user details */}
        <div style={styles.profileInfo}>
          <h2>Personal Information</h2>
          <ul>
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Address:</strong> {user.address || 'Not available'}</li>
            <li><strong>Phone:</strong> {user.phone || 'Not available'}</li>
          </ul>
        </div>

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
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
  },
};

export default DummyProfile;
