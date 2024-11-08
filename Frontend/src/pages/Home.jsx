import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);

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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                width: '200px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <img
                src={product.image}
                alt={product.product_name}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
              <h3 style={{ fontSize: '1rem', margin: '8px 0' }}>{product.product_name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>Rating: {product.rating} ⭐</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>${product.price}</p>
              <button style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px'
              }}>
                Add to Cart
              </button>
              <button style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px'
              }}>
                Show More
              </button>
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
