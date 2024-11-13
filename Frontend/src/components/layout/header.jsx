import {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../pages/context/useAuth";

const Header = () => {
  const { isAuthenticated, isRegistered, login } = useAuth();
  const location = useLocation();

  // State to manage hover effects
  const [hoveredLink, setHoveredLink] = useState(null);

  // Define active route color
  const activeColor = '#ffeb3b'; // Brighter color for the active link
  const defaultColor = '#EDB8C7'; // Brighter default color

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
                color: location.pathname === '/' ? activeColor : hoveredLink === 'home' ? activeColor : defaultColor 
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
                color: location.pathname === '/mycart' ? activeColor : hoveredLink === 'mycart' ? activeColor : defaultColor 
              }} 
              onMouseEnter={() => setHoveredLink('mycart')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              My Cart
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/about" 
              style={{ 
                ...styles.link, 
                color: location.pathname === '/about' ? activeColor : hoveredLink === 'about' ? activeColor : defaultColor 
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
                color: location.pathname === '/contact' ? activeColor : hoveredLink === 'contact' ? activeColor : defaultColor 
              }} 
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact
            </Link>
          </li>

          {/* Conditional Links for Authenticated User */}
          {isAuthenticated ? (
            <li style={styles.navItem}>
              <Link 
                to="/dummyprofile" 
                style={{ 
                  ...styles.link, 
                  color: location.pathname === '/dummyprofile' ? activeColor : hoveredLink === 'dummyprofile' ? activeColor : defaultColor 
                }} 
                onMouseEnter={() => setHoveredLink('dummyprofile')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Profile
              </Link>
            </li>
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
                      color: location.pathname === '/login' ? activeColor : hoveredLink === 'login' ? activeColor : defaultColor 
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
                    style={{
                      ...styles.link,
                      color: location.pathname === '/register' ? activeColor : hoveredLink === 'register' ? activeColor : defaultColor
                    }}
                    onMouseEnter={() => setHoveredLink('register')}
                    onMouseLeave={() => setHoveredLink(null)}
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
};

// Export the Header component
export default Header;
