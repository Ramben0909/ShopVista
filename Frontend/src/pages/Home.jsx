import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../pages/context/useAuth.jsx'; // Import the useAuth hook
import Layout from '../components/layout/layout.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useAuth(); // Access addToCart function from context
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout title={"Home"}>
      <div>
        <h1>Product Listings</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.product_id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: '8px 0' }}>{product.product_name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>Rating: {product.rating} ⭐</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>${product.price}</p>
                  <button
                    onClick={() => addToCart(product)} // Add product to cart
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      marginRight: '8px'
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '8px'
                    }}
                    onClick={() => navigate(`/productdetails/${product.product_id}`)} // Navigate to product details
                  >
                    Show More
                  </button>
                </div>
                <img
                  src={product.image}
                  alt={product.product_name}
                  style={{ width: '150px', height: 'auto', borderRadius: '4px', marginLeft: '16px' }}
                />
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
