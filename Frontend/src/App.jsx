import React, { useState } from 'react';
import './App.css';
import Layout from './components/layout/layout.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <h1 className="center-align">ShopVista</h1> {/* Use className instead of class */}
      </Layout>
    </>
  );
}

export default App;
