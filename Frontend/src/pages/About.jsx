import Layout from '../components/layout/layout.jsx';

const About = () => {
  return (
    <Layout title={"About Us"}>
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are committed to providing the best service to our customers.
      </p>
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver quality products that exceed expectations and make a positive impact.
        </p>
      </section>
      <section>
        <h2>Our Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Customer Satisfaction</li>
        </ul>
      </section>
    </Layout>
  );
}

export default About;
