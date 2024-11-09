import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.jsx';
import { useAuth } from '../pages/context/useAuth.jsx'; // Assuming addToCart comes from context

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null);
  const { addToCart } = useAuth(); // Assuming this function is coming from context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Layout title="Product Details">
      <div style={{ textAlign: 'center' }}>
        {/* Product Image */}
        <img
          src={`http://localhost:5000${product.image}`} // Prepend base URL to image path
          alt={product.product_name}
          style={{ width: '300px', marginBottom: '20px' }}
        />
        <h2>{product.product_name}</h2>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating} ⭐</p>
        <p>Seller: {product.seller_name}</p>
        <p>{product.details}</p>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Add to Cart
        </button>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')} // Navigate to homepage on click
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            marginLeft: '10px',
          }}
        >
          Back to Home
        </button>
      </div>
    </Layout>
  );
};

export default ProductDetails;
