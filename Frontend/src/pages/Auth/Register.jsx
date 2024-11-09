import { useState } from 'react';
import Layout from '../../components/layout/layout.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/useAuth.jsx'; // Import from the new file

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
  const { register } = useAuth();  // Access register function from context

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
  
        // Call the register function to update isRegistered to true
        register(); 
  
        setTimeout(() => {
          navigate('/login'); // Redirect to login after registration
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
      <div className="container mt-5">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>Already have an account? <button className="btn btn-link" onClick={() => navigate('/login')}>Login</button></p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
