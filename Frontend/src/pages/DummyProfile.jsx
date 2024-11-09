import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/useAuth';
import Layout from '../components/layout/layout.jsx';
import { toast } from 'react-toastify';  // For showing toast messages on errors

function DummyProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true);  // Track user data loading state

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setLoadingUser(false);  // If user is authenticated, stop loading state
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loadingUser) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    toast.error("Failed to load user data. Please try again.");
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
            <li><strong>Address:</strong> {user.address}</li>
            <li><strong>Phone:</strong> {user.phone}</li>
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
