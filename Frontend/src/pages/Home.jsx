import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.jsx';
import SearchBar from './SearchBar.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sellerName, setSellerName] = useState('');  // Added seller name state
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query, category, minPrice, maxPrice, minRating,sellerName, showOffersOnly) => {
    setQuery(query);
    let filtered = products;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.product_name.toLowerCase().includes(query.toLowerCase()) ||
          product.seller_name.toLowerCase().includes(query.toLowerCase()) ||
          product.item_description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) =>
          (minPrice ? product.price >= minPrice : true) &&
          (maxPrice ? product.price <= maxPrice : true)
      );
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Filter by seller name
  if (sellerName) {
    filtered = filtered.filter((product) =>
      product.seller_name.toLowerCase().includes(sellerName.toLowerCase())
    );
  }
  
  // Filter by offer present
  if (showOffersOnly) {
    setFilteredProducts(products.filter(product => product.offers.length > 0));
  } else {
    setFilteredProducts(products);
  }
  
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'category') {
      setSelectedCategory(value);
    } else if (type === 'price') {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
    } else if (type === 'rating') {
      setMinRating(value);
    }
  };

  return (
    <Layout title={'Home'}>
      <div style={{ padding: '20px' }}>
        {/* Search Bar and Category Filter */}
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '24px' }}>Product Listings</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.product_id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '20px',
                  width: '250px',
                  textAlign: 'center',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={product.image}
                  alt={product.product_name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '8px' }}>
                  {product.product_name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '12px' }}>
                  Rating: {product.rating} ⭐
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
                  ${product.price}
                </p>
                <button
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    width: '100%',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  Add to Cart
                </button>
                <button
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    width: '100%',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Show More
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>No products available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
