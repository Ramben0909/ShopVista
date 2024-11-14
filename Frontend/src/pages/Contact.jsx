 
import Layout from '../components/layout/layout.jsx'; // Assuming you have a layout component
   // Ensure Bootstrap is imported

const ContactPage = () => {
  return (
    <Layout title="Contact Us">
      <header className="text-center mb-5">
        <h1 className="display-3 text-dark">Contact Us</h1>
        <p className="lead text-muted">
          We'd love to hear from you! Here's how you can get in touch with us.
        </p>
      </header>

      <div className="map-container mb-5">
        <h2 className="h3 text-center mb-4">Find Us</h2>
        <iframe
          title="Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.777186988822!2d88.42699301426723!3d22.57646284674509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272b2f08c825d%3A0x5c2f47bb01dbbe8c!2sBidhannagar%20700001%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1697442947450!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-container bg-light py-5 shadow-sm rounded-3 mb-5">
        <h2 className="h2 text-center text-dark mb-4">Get in Touch</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 border-light">
              <h3 className="h4 text-primary mb-3">Our Office (IEM)</h3>
              <p>Bidhannagar 700001, Kolkata</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 border-light">
              <h3 className="h4 text-primary mb-3">Phone</h3>
              <p>+91 922718123</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 border-light">
              <h3 className="h4 text-primary mb-3">Email</h3>
              <p>nocodeRouank@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage;
