import React from 'react';
import Layout from '../components/layout/layout.jsx';

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div style={styles.contactContainer}>
        <h1 style={styles.contactTitle}>Contact Us</h1>
        
        <p style={styles.contactDescription}>
          We'd love to hear from you! Here's how you can get in touch with us.
        </p>
        
        <div style={styles.contactInfo}>
          <div style={styles.contactCard}>
            <h2 style={styles.contactSubTitle}>Our Office</h2>
            <p style={styles.contactText}>1234 Business Ave, Suite 567</p>
            <p style={styles.contactText}>City, State, 12345</p>
          </div>
          
          <div style={styles.contactCard}>
            <h2 style={styles.contactSubTitle}>Phone</h2>
            <p style={styles.contactText}>+1 (555) 123-4567</p>
          </div>

          <div style={styles.contactCard}>
            <h2 style={styles.contactSubTitle}>Email</h2>
            <p style={styles.contactText}>contact@company.com</p>
          </div>
        </div>

        <div style={styles.mapContainer}>
          <h2 style={styles.contactSubTitle}>Find Us</h2>
          <iframe
            title="Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.612626586131!2d-122.08424948469061!3d37.42206517982574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb8b2a775c2b%3A0xa2d0787a8ac5566d!2sGoogleplex!5e0!3m2!1sen!2sus!4v1684784594579!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={styles.mapStyle}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div style={styles.footerContainer}>
          <h2 style={styles.contactSubTitle}>Follow Us</h2>
          <p style={styles.contactText}>Stay connected through our social media channels:</p>
          <div style={styles.socialLinks}>
            <a href="https://facebook.com" style={styles.socialLink}>Facebook</a>
            <a href="https://twitter.com" style={styles.socialLink}>Twitter</a>
            <a href="https://instagram.com" style={styles.socialLink}>Instagram</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  contactContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  contactTitle: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  contactDescription: {
    fontSize: '1.1rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  contactInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  contactSubTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  contactText: {
    fontSize: '1rem',
    color: '#666',
  },
  mapContainer: {
    marginBottom: '30px',
  },
  mapStyle: {
    border: '0',
    borderRadius: '8px',
  },
  footerContainer: {
    textAlign: 'center',
  },
  socialLinks: {
    marginTop: '10px',
  },
  socialLink: {
    fontSize: '1.1rem',
    color: '#007bff',
    margin: '0 10px',
    textDecoration: 'none',
  },
};

export default Contact;
