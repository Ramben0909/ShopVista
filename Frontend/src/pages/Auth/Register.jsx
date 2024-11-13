import { useState } from 'react';
import Layout from '../../components/layout/layout.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/useAuth.jsx';

const apiUrl = import.meta.env.VITE_API;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/register`, formData);
      setLoading(false);

      if (response.data.success) {
        setSuccess('Registration successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          password: '',
        });

        toast.success(response.data.message);
        register();

        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } else {
        setError(response.data.message || 'Registration failed.');
        toast.error(response.data.message || 'Registration failed.');
      }

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Layout title="Register">
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4 shadow-lg rounded" style={{
          maxWidth: '500px', 
          width: '100%', 
          border: 'none', 
          background: 'linear-gradient(135deg, #f9f9f9, #e6e6e6)',
          paddingBottom: '30px'
        }}>
          <h2 className="text-center mb-4" style={{
            color: '#333', 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            letterSpacing: '1px'
          }}>Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control p-2 text-secondary"
                style={{ fontStyle: 'italic', fontSize: '0.95rem' }}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control p-2 text-secondary"
                style={{ fontStyle: 'italic', fontSize: '0.95rem' }}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control p-2 text-secondary"
                style={{ fontStyle: 'italic', fontSize: '0.95rem' }}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control p-2 text-secondary"
                style={{ fontStyle: 'italic', fontSize: '0.95rem' }}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control p-2 text-secondary"
                style={{ fontStyle: 'italic', fontSize: '0.95rem' }}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                backgroundColor: '#007bff', 
                border: 'none', 
                fontWeight: '600',  // Bolder text
                fontSize: '1rem',  // Slightly larger text
                transition: 'background-color 0.3s, transform 0.3s',
                padding: '0.6rem'  // Thinner button
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p style={{ fontSize: '1rem' }}>Already have an account? 
              <button className="btn btn-primary w-100 mt-3" style={{
                 backgroundColor: '#007bff', 
                 border: 'none', 
                 fontWeight: '600',  // Bolder text
                 fontSize: '1rem',  // Slightly larger text
                 transition: 'background-color 0.3s, transform 0.3s',
                 padding: '0.6rem',
                textDecoration: 'underline'
              }} onClick={() => navigate('/login')}>Login</button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
