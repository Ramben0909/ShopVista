import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch, onFilterChange, categories = [],sellerLocations = []}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sellerName, setSellerName] = useState('');  // Added seller name state
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value, selectedCategory, minPrice, maxPrice, minRating,sellerName,showOffersOnly,selectedLocation);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange('category', event.target.value);
    onSearch(searchQuery, event.target.value, minPrice, maxPrice, minRating,sellerName,showOffersOnly,selectedLocation);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    onFilterChange('seller_location', event.target.value);
    onSearch(searchQuery, selectedCategory, minPrice, maxPrice, minRating, sellerName, showOffersOnly, event.target.value);
  };


  const handleRatingChange = (event) => {
    setMinRating(Number(event.target.value));
    onFilterChange('rating', event.target.value);
    onSearch(searchQuery, selectedCategory, minPrice, maxPrice, Number(event.target.value),sellerName,showOffersOnly,selectedLocation);
  };

  const handleSellerNameChange = (event) => {
    setSellerName(event.target.value);
    onSearch(searchQuery, selectedCategory, minPrice, maxPrice, minRating, event.target.value, showOffersOnly,selectedLocation);
  };

  // Handle offer present change
  const handleOfferFilterChange = () => {
    const newShowOffersOnly = !showOffersOnly;
    setShowOffersOnly(newShowOffersOnly);
    onFilterChange('offer', newShowOffersOnly);
    onSearch(searchQuery, selectedCategory, minPrice, maxPrice, minRating, sellerName, newShowOffersOnly,selectedLocation);
  };
  
// Handle min price change
const handleMinPriceChange = (event) => {
  const newMinPrice = event.target.value === '' ? 0 : Number(event.target.value);
  setMinPrice(newMinPrice);
  const effectiveMaxPrice = maxPrice === '' ? Infinity : maxPrice; // If maxPrice is empty, use Infinity
  onFilterChange('price', [newMinPrice, effectiveMaxPrice]);
  onSearch(searchQuery, selectedCategory, newMinPrice, effectiveMaxPrice, minRating, sellerName, showOffersOnly,selectedLocation);
};

// Handle max price change
const handleMaxPriceChange = (event) => {
  const newMaxPrice = event.target.value === '' ? Infinity : Number(event.target.value); // Default to Infinity if no max price
  setMaxPrice(newMaxPrice);
  const effectiveMinPrice = minPrice === '' ? 0 : minPrice; // If minPrice is empty, use 0
  onFilterChange('price', [effectiveMinPrice, newMaxPrice]);
  onSearch(searchQuery, selectedCategory, effectiveMinPrice, newMaxPrice, minRating, sellerName, showOffersOnly,selectedLocation);
};

// Generate price options, adding 'All' for max price
const generatePriceOptions = () => {
  const options = []; // Start from 0 to allow "no minimum"
  for (let i = 100; i <= 2000; i += 100) {
    options.push(i);
  }
  return options;
};

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMinPrice('');
    setMinRating(0);
    setMaxPrice('');
    setSellerName('');
    setShowOffersOnly(false);
    onSearch(searchQuery, 'All', 0, '', '', '', false,'All');
    onFilterChange('category', 'All');
    onFilterChange('rating', 0);
    onFilterChange('price', ['','']);
    onFilterChange('seller_location', 'All');
  };

  return (
    <div
      style={{
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#646d74',
        borderRadius: '8px',
        padding: '20px',
        
      }}
    >
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products..."
        style={{
          padding: '12px 20px',
          borderRadius: '25px',
          border: '1px solid #dcdcdc',
          width: '600px',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
        onBlur={(e) => (e.target.style.borderColor = '#dcdcdc')}
      />

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #dcdcdc',
            fontSize: '14px',
            width: '150px',
            minWidth: '150px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
          onBlur={(e) => (e.target.style.borderColor = '#dcdcdc')}
        >
         <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Seller Location Filter */}
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #dcdcdc',
            fontSize: '14px',
            width: '150px',
            minWidth: '150px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <option value="All">All Locations</option>
          {sellerLocations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        {/* Price Filter */}
        {/* Min Price Filter */}
        <select
          value={minPrice}
          onChange={handleMinPriceChange}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #dcdcdc',
            fontSize: '14px',
            width: '150px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
        >
          <option value={0}>Min Price</option> {/* Display Min Price as 0 */}
          {generatePriceOptions().map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>

        {/* Max Price Filter */}
        <select
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #dcdcdc',
            fontSize: '14px',
            width: '150px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
        >
          <option value="">Max Price</option>
          {generatePriceOptions()
            .filter((price) => price > minPrice)
            .map((price) => (
              <option key={price} value={price}>
                ${price}
              </option>
            ))}
        </select>

        {/* Rating Filter */}
        <select
          value={minRating}
          onChange={handleRatingChange}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #dcdcdc',
            fontSize: '14px',
            width: '150px',
            minWidth: '150px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
          onBlur={(e) => (e.target.style.borderColor = '#dcdcdc')}
        >
          <option value={0}>Min Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        {/* Seller Filter */}
        <input
          type="text"
          value={sellerName}
          onChange={handleSellerNameChange}
          placeholder="Brand/Seller Name"
          style={{ padding: '10px 20px', borderRadius: '25px' }}
        />

        {/* Offer Filter */}
        <button
          className={`filter-chip ${showOffersOnly ? 'selected' : ''}`} // Correct string interpolation syntax
          onClick={handleOfferFilterChange}
          style={{
            backgroundColor: showOffersOnly ? '#4CAF50' : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '50px',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '14px',
            color: showOffersOnly ? 'white' : 'black',
          }}
        >
          {showOffersOnly ? 'Show All Products' : 'Show Products with Offers'}
        </button>



          {/* Clear Button */}
      <button
          onClick={handleClearFilters}
          style={{
            
            padding: '10px 20px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Clear
        </button>
         
      </div>
      
    </div>
  );
};

export default SearchBar;