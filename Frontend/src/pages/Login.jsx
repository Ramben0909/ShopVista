import { useState } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/useAuth';
import './Login.css'; // Importing the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Using the login function from context

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
        // Pass the token and user data to context
        const { token, user } = response.data; // Assuming the response contains token and user data
        login(token, user); // Calling login function from context to store token and user data
        console.log(token);
        console.log(user);  // Log user data for confirmation
        toast.success(response.data.message);
        
        // Navigate to home or dashboard after successful login
        navigate('/'); 
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
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
