import Layout from '../components/layout/layout.jsx';
import { useAuth } from '../pages/context/useAuth'; // Import the useAuth hook

const MyCart = () => {
  const { cartItems, removeFromCart } = useAuth(); // Access cartItems and removeFromCart function from context

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
  };

  return (
    <Layout title={"MyCart"}>
      <h1
            style={{
              textAlign: 'center',
              color: '#333',
              fontSize: '3rem',
              fontWeight: '700',
              textTransform: 'capitalize',
              marginBottom: '20px',
              padding: '10px',
              borderBottom: '4px solid #28a745',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            My Cart
          </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // Ensures space between cart and checkout section
          alignItems: 'flex-start', // Align items at the top
          marginBottom: '30px',
          maxWidth: '1200px', // Adjust width of the main container
          margin: '0 auto', // Center the main container
        }}
      >

        {/* Left Side - Cart Products */}
        <div
          style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginRight: '20px',
          }}
        >
          {cartItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '700px',
                    width:'600px',
                    margin: '0 auto',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ flex: '1' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: '8px 0' }}>{item.product_name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>Rating: {item.rating} ⭐</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>${item.price}</p>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
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
                  <img
                    src={`http://localhost:5000${item.image}`}
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
            <p style={{
              fontSize: '1.5rem',
              color: '#888',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '50px',
              padding: '20px',
              borderRadius: '8px',
              
            }}>Your cart is empty</p>
          )}
        </div>

        {/* Right Side - Checkout Button */}
        {cartItems.length > 0 && (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: 'fit-content',
      marginTop: '130px',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          fontSize: '1.7rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '6px',
          marginTop: '4px',
        }}
      >
        Do you want to checkout?
      </p>
      <button
        onClick={handleCheckout}
        style={{
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '15px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          border: 'none',
          fontSize: '1.5rem',
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        Checkout
      </button>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
};

export default MyCart;