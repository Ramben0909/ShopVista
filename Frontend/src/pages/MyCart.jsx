import Layout from '../components/layout/layout.jsx';
import { useAuth } from '../pages/context/useAuth'; // Import the useAuth hook

const MyCart = () => {
  const { cartItems, removeFromCart } = useAuth(); // Access cartItems and removeFromCart function from context

  return (
    <Layout title={"MyCart"}>
      <h1>My Cart</h1>
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
                    marginTop: '8px'
                  }}
                >
                  Remove
                </button>
              </div>
              <img
                src={item.image}
                alt={item.product_name}
                style={{ width: '150px', height: 'auto', borderRadius: '4px', marginLeft: '16px' }}
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
