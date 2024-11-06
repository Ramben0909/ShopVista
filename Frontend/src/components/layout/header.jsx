
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Home</Link></li>
          <li style={styles.navItem}><Link to="/contact" style={styles.link}>Contact</Link></li>
          <li style={styles.navItem}><Link to="/policy" style={styles.link}>Policy</Link></li>
          <li style={styles.navItem}><Link to="/about" style={styles.link}>About</Link></li>
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
