import React from 'react';
import Layout from '../components/layout/layout.jsx';

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div style={styles.aboutContainer}>
        <h1 style={styles.aboutTitle}>About Us</h1>
        
        <p style={styles.aboutDescription}>
          Welcome to our website! We are committed to providing the best service to our customers.
        </p>
        
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            Our mission is to deliver quality products that exceed expectations and make a positive impact.
          </p>
        </section>
        
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Values</h2>
          <ul style={styles.valuesList}>
            <li style={styles.listItem}>Integrity</li>
            <li style={styles.listItem}>Innovation</li>
            <li style={styles.listItem}>Customer Satisfaction</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

const styles = {
  aboutContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  aboutTitle: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  aboutDescription: {
    fontSize: '1.1rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  sectionText: {
    fontSize: '1.1rem',
    color: '#666',
  },
  valuesList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '1.1rem',
    color: '#666',
  },
  listItem: {
    marginBottom: '8px',
  },
};

export default About;
