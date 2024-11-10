import Layout from '../components/layout/layout.jsx';
import { useAuth } from '../pages/context/useAuth'; // Import the useAuth hook

const MyCart = () => {
  const { cartItems, removeFromCart } = useAuth(); // Access cartItems and removeFromCart function from context

  const handleBuyNow = () => {
    // Logic for handling "Buy Now" action can be implemented here
    console.log("Proceeding to checkout with items:", cartItems);
    // Navigate to checkout or trigger payment process
  };

  return (
    <Layout title={"MyCart"}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1
  style={{
    textAlign: 'center',
    color: '#333', // Dark text for readability
    fontSize: '3rem', // Larger font size for emphasis
    fontWeight: '700', // Bold font weight for prominence
    textTransform: 'capitalize', // Capitalize the first letter of each word
    marginBottom: '20px', // Space below the heading
    padding: '10px', // Padding to provide some space around the text
    borderBottom: '4px solid #28a745', // Decorative bottom border to highlight the header
    display: 'inline-block', // Ensures the border only appears below the text
    letterSpacing: '1px', // Slightly increase spacing between letters for style
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle text shadow for depth
  }}
>
  My Cart
</h1>


        {cartItems.length > 0 && (
          <button
            onClick={handleBuyNow}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              border: 'none',
              fontSize: '1rem',
            }}
          >
            Buy Now
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          {cartItems.map((item) => (
            <div
              key={item.product_id}
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
                <h3 style={{ fontSize: '1.2rem', margin: '8px 0' }}>{item.product_name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>Rating: {item.rating} ⭐</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>${item.price}</p>
                <button
                  onClick={() => removeFromCart(item.product_id)} // Remove product from cart
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Remove
                </button>
              </div>
              {/* Ensure the image path is correct */}
              <img
                src={`http://localhost:5000${item.image}`} // Prepend the base URL for the image
                alt={item.product_name}
                style={{
                  width: '150px',
                  height: 'auto',
                  borderRadius: '4px',
                  marginLeft: '16px',
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </Layout>
  );
};

export default MyCart;
