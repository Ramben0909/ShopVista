import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../pages/context/useAuth";

const Header = () => {
  const { isAuthenticated, isRegistered, login, logout } = useAuth();
  const navigate = useNavigate();

  // Conditional redirect: Only redirect to home page if not already on it
  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== "/dummyprofile") {
      navigate('/'); // Redirect to home page
    }
  }, [isAuthenticated, navigate]);

  // State to manage hover effects
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {/* Common Links */}
          <li style={styles.navItem}>
            <Link 
              to="/" 
              style={{ 
                ...styles.link, 
                color: hoveredLink === 'home' ? 'blue' : '#EDB8C7' 
              }} 
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/mycart" 
              style={{ 
                ...styles.link, 
                color: hoveredLink === 'mycart' ? 'blue' : '#EDB8C7' 
              }} 
              onMouseEnter={() => setHoveredLink('mycart')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              My cart
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/about" 
              style={{ 
                ...styles.link, 
                color: hoveredLink === 'about' ? 'blue' : '#EDB8C7' 
              }} 
              onMouseEnter={() => setHoveredLink('about')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              About
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/contact" 
              style={{ 
                ...styles.link, 
                color: hoveredLink === 'contact' ? 'blue' : '#EDB8C7' 
              }} 
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact
            </Link>
          </li>

          {/* Conditional Links for Authenticated User */}
          {isAuthenticated ? (
            <>
              <li style={styles.navItem}>
                <Link 
                  to="/dummyprofile" 
                  style={{ 
                    ...styles.link, 
                    color: hoveredLink === 'dummyprofile' ? 'blue' : '#fff' 
                  }} 
                  onMouseEnter={() => setHoveredLink('dummyprofile')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Dummy Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Register/Login Link */}
              {isRegistered ? (
                <li style={styles.navItem}>
                  <Link 
                    to="/login" 
                    onClick={login} 
                    style={{ 
                      ...styles.link, 
                      color: hoveredLink === 'login' ? 'blue' : '#EDB8C7' 
                    }} 
                    onMouseEnter={() => setHoveredLink('login')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {isAuthenticated ? 'Logged In' : 'Log In'}
                  </Link>
                </li>
              ) : (
                <li style={styles.navItem}>
                  <Link 
                    to="/register" 
                    style={styles.link}
                  >
                    Register/Login
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#4c1130',
    padding: '1.5rem', // Increased padding for larger navbar
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between', // Space between left items and the register button
    alignItems: 'center', // Center items vertically
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem', // Increased space between items
    padding: 0,
    margin: 0,
    flexGrow: 1, // Allow the list to grow and take available space
  },
  navItem: {},
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem', // Increased font size for better visibility
    transition: 'color 0.3s', // Transition for hover effect
  },
  registerButton: {
    marginLeft: 'auto', // Push the register button to the right
  },
  registerLink: {
    color: '#fff',
    padding: '0.5rem 1rem', // Padding for the button
    borderRadius: '4px', // Rounded corners for the button
    textDecoration: 'none',
    fontSize: '1.5rem', // Increased font size for the button
    transition: 'background-color 0.3s, color 0.3s', // Transition for hover effect
  },
};

// Export the Header component
export default Header;
