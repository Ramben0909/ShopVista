import { useState } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/useAuth.jsx';
import './Login.css'; // Importing the CSS file
import { useAuth } from '../pages/context/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation for email and password
    if (!email || !password) {
      toast.error('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`, { email, password });

      if (response.data.success === true) {
        login(response.data.token, response.data.user);
        console.log(response.data.user)  // Pass token and user data
        toast.success(response.data.message);
        login();
        navigate('/'); 
        navigate('/');  // Navigate to home after login
      } else {
        toast.error(response.data.message);
      }      
    } catch (error) {
      toast.error('Login failed. Please try again!');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="login-background"></div> {/* Background gradient */}
      <div className="login-container mt-5">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id=" email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
    <Layout title="Login">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;