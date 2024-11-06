import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';  // Import Footer

function Layout(props) {
  return (
    <div>
      <Header />
      <main style={{minHeight:'80vh'}}>
        {props.children}
      </main>
      <Footer />  {/* Add Footer at the end */}
    </div>
  );
}

export default Layout;
