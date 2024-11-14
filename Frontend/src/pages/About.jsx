/* eslint-disable react/prop-types */
import Layout from '../components/layout/layout.jsx';

const ValueBox = ({ text }) => (
  <div className="col-md-4 mb-3">
    <div className="p-3 text-center rounded h-100 border border-2 border-dark shadow-sm fs-5" 
         style={{ backgroundColor: '#db8aad' }}>
      {text}
    </div>
  </div>
);

const SectionContainer = ({ children }) => (
  <div className="card mb-3 border border-2 shadow-sm" style={{ borderColor: '#4c1130' }}>
    <div className="card-body p-3">
      {children}
    </div>
  </div>
);

const About = () => {
  const values = ["Integrity", "Innovation", "Customer Satisfaction"];

  return (
    <Layout title="About Us">
      <div className="container-fluid py-3 min-vh-100">
        {/* Header Section */}
        <header className="text-center mb-3">
          <h1 className="display-4 mb-2 fw-bold">About Us</h1>
          <p className="lead">
            Welcome to our website! We are committed to providing the best service to our customers.
          </p>
        </header>

        {/* Main Content Section */}
        <div className="row mx-2">
          <div className="col-12">
            {/* Mission Section */}
            <SectionContainer>
              <h2 className="h3 mb-2 fw-bold" style={{ color: '#4c1130' }}>
                Our Mission
              </h2>
              <p className="fs-6">
                Our mission is to deliver quality products that exceed expectations and make a positive impact.
              </p>
            </SectionContainer>

            {/* Values Section */}
            <SectionContainer>
              <h2 className="h3 mb-3 fw-bold" style={{ color: '#4c1130' }}>
                Our Values
              </h2>
              <div className="row g-2">
                {values.map((value, index) => (
                  <ValueBox key={index} text={value} />
                ))}
              </div>
            </SectionContainer>

            {/* Project Section */}
            <SectionContainer>
              <h2 className="h3 mb-2 fw-bold" style={{ color: '#4c1130' }}>
                Industrial Management Project
              </h2>
              <p className="fs-6">
                The Industrial Management Project was a transformative experience for all of us. 
                It allowed us to apply practical management strategies, improve team collaboration, 
                and develop solutions that enhanced operational efficiency. Through this project, 
                we gained valuable insights into the challenges and rewards of industrial management, 
                fostering skills that will benefit us in future endeavors.
              </p>
            </SectionContainer>
          </div>
        </div>

        {/* Image Section - Full size at bottom */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="text-center px-4">
              <img 
                src="http://localhost:5000/images/21.png"
                alt="Description of the image"
                className="img-fluid rounded shadow-sm"
                style={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px', // Increased max height
                  objectFit: 'contain' // Shows full image without cropping
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;