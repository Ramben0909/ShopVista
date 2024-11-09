import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/useAuth.jsx';
import Layout from '../components/layout/layout.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // State to track loading
  const [error, setError] = useState(null);      // State to track any errors
  const { addToCart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products', {
          headers: {
            'Cache-Control': 'no-cache', // Prevent caching
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  // Display loading state or error message
  if (loading) {
    return (
      <Layout title="Home">
        <div>Loading products...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Home">
        <div>Error fetching products: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout title="Home">
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
                  maxWidth: '1200px', // Increased maxWidth to make the box wider
                  margin: '0 auto',
                }}
              >
                {/* Product Info Section (Left) */}
                <div style={{ flex: '1', marginRight: '16px' }}>
                  <h3 style={{ fontSize: '1.4rem', margin: '8px 0' }}>{product.product_name}</h3>
                  <p style={{ fontSize: '1rem', color: '#555' }}>Rating: {product.rating} ⭐</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      marginRight: '8px',
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '8px',
                    }}
                    onClick={() => navigate(`/productdetails/${product.product_id}`)}
                  >
                    Show More
                  </button>
                </div>

                {/* Product Image Section (Right) */}
                <img
                  src={`http://localhost:5000${product.image}`} // Ensure the correct image URL
                  alt={product.product_name}
                  style={{
                    width: '300px', // Larger image size
                    height: 'auto',
                    borderRadius: '4px',
                  }}
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
