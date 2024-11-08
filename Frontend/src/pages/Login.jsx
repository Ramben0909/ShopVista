// Login.jsx
import { useState } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/useAuth.jsx';  // Importing useAuth hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // To navigate after successful login
  const { login } = useAuth(); // Using the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`, { email, password });
      console.log(response);
      
      if (response.data.success === "Successful") {
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message);

        // Update the authentication state
        login();

        navigate('/'); // Redirect to home or dashboard after login
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Login"}>
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
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
