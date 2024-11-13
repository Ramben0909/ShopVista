import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/useAuth'; // Import useAuth hook
import Layout from '../components/layout/layout';
import { toast } from 'react-toastify';

function DummyProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
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
      <div className="container d-flex justify-content-center align-items-start vh-100 pt-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div
          className="card shadow-lg p-5"
          style={{
            maxWidth: '700px',
            width: '100%',
            background: 'linear-gradient(145deg, #ffffff, #c0c0c0)',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            color: '#333',
          }}
        >
          <h1 className="text-center mb-4" style={{ fontSize: '1.6rem', fontWeight: '600', color: '#333' }}>My Profile</h1>
           
          <div className="card-body" style={{ padding: '1.5rem' }}>
            <h3 className="text-secondary mb-3" style={{ fontSize: '1.8rem', fontWeight: '500', color: '#555' }}>Personal Information</h3>
            <ul className="list-group list-group-flush" style={{ fontSize: '1.5rem' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
                <strong>Name:</strong> <span>{user.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
                <strong>Email:</strong> <span>{user.email}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
                <strong>Address:</strong> <span>{user.address || 'Not available'}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
                <strong>Phone:</strong> <span>{user.phone || 'Not available'}</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleLogout}
              className="btn btn-danger px-4 py-2"
              style={{ fontWeight: '600', fontSize: '1rem', borderRadius: '8px' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DummyProfile;
