 
function Footer() {
  return (
    <div className="p-4" style={{ background: 'linear-gradient(to right, #a64d79, #4ca1af)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Left side - Follow us */}
        <div className="d-flex" style={{ gap: '20px', fontSize: '1.8rem' }}>
          <p className="footer-text">Follow us:</p>
          <a href="https://facebook.com" className="footer-link">Facebook</a>
          <a href="https://twitter.com" className="footer-link">Twitter</a>
          <a href="https://linkedin.com" className="footer-link">LinkedIn</a>
        </div>

        {/* Center - Privacy Policy and Terms of Service */}
        <div className="d-flex" style={{ gap: '20px', fontSize: '1.7rem', flexGrow: 1, justifyContent: 'center' }}>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        </div>

        {/* Right side - Company name and copyright */}
        <div className="text-right" style={{ fontSize: '1.7rem' }}>
          <h2 className="footer-text">InstaMart</h2>
          <p className="footer-text">&copy; 2024 All rights reserved</p>
        </div>
      </div>

      {/* Inline styles for hover effect */}
      <style>
        {`
          .footer-link {
            color: #ffffff; /* Initial color for links */
            text-decoration: none; /* Remove underline */
            transition: color 0.3s ease-in-out; /* Smooth color transition */
          }

          .footer-link:hover {
            color: #20124d; /* Change color to golden yellow on hover */
          }

          .footer-text {
            color: #4c1130; /* Initial color for text */
            transition: color 0.3s ease-in-out; /* Smooth color transition */
          }

          .footer-text:hover {
            color: #f39c12; /* Change color to golden yellow on hover */
          }
        `}
      </style>
    </div>
  );
}

export default Footer;
