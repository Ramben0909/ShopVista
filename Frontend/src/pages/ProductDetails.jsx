import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.jsx';
import { useAuth } from '../pages/context/useAuth.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useAuth();

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
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.product_name}
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.6em', fontWeight: '600', marginBottom: '10px' }}>
              {product.product_name}
            </h2>
            <p style={{ fontSize: '1em', color: '#333', margin: '8px 0' }}>
              Price: <span style={{ fontWeight: 'bold' }}>${product.price}</span>
            </p>
            <p style={{ fontSize: '1em', margin: '8px 0' }}>
              Rating: {product.rating} ⭐
            </p>
            <p style={{ fontSize: '1em', color: '#555', margin: '8px 0' }}>
              Seller: <span style={{ fontWeight: 'bold' }}>{product.seller_name}</span> ({product.seller_location})
            </p>
            <p style={{ fontSize: '1em', color: '#555', margin: '8px 0' }}>
              Category: <span style={{ fontWeight: 'bold' }}>{product.category}</span>
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '15px',
                marginRight: '10px',
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '15px',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>

        <div style={{ marginTop: '20px', color: '#444' }}>
          <h3 style={{ fontSize: '1.4em', fontWeight: '600', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
            Product Description
          </h3>
          <p style={{ lineHeight: '1.5', fontSize: '1em' }}>
            {product.item_description}
          </p>
        </div>

        <div style={{ marginTop: '20px', color: '#444' }}>
          <h3 style={{ fontSize: '1.4em', fontWeight: '600', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
            Additional Information
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.5' }}>
            {product.specifications && Object.keys(product.specifications).map((key) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}: {product.specifications[key]}
              </li>
            ))}
          </ul>
        </div>

        {product.has_offer && product.offers?.length > 0 && (
          <div style={{ marginTop: '20px', color: '#444' }}>
            <h3 style={{ fontSize: '1.4em', fontWeight: '600', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
              Special Offers
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.5' }}>
              {product.offers.map((offer, index) => (
                <li key={index}>{offer}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
