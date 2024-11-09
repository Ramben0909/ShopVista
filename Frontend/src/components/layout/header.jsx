import { useEffect } from 'react';
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

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Home</Link></li>
          <li style={styles.navItem}><Link to="/mycart" style={styles.link}>My cart</Link></li>
          <li style={styles.navItem}><Link to="/about" style={styles.link}>About</Link></li>
          <li style={styles.navItem}><Link to="/contact" style={styles.link}>Contact</Link></li>

          {isAuthenticated ? (
            <li style={styles.navItem}>
              <Link to="/dummyprofile" style={styles.link}>Dummy Profile</Link>
            </li>
          ) : (
            <li style={styles.navItem}>
              {isRegistered ? (
                <Link 
                  to="/login" 
                  onClick={login} 
                  style={styles.link}
                >
                  {isAuthenticated ? 'Logged In' : 'Log In'}
                </Link>
              ) : (
                <Link to="/register" style={styles.link}>Register/Login</Link>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '1rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    padding: 0,
    margin: 0,
  },
  navItem: {},
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Header;
