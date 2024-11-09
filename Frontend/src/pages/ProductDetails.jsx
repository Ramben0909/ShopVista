import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
        <img src={product.image} alt={product.product_name} style={{ width: '300px', marginBottom: '20px' }} />
        <h2>{product.product_name}</h2>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating} ⭐</p>
        <p>Seller: {product.seller_name}</p>
        <p>{product.details}</p>
        <button onClick={() => addToCart(product)} style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>
          Add to Cart
        </button>
      </div>
    </Layout>
  );
};

export default ProductDetails;
