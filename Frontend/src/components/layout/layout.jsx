import Header from './header.jsx';
import Footer from './footer.jsx';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {  // Destructure children from props
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer /> {/* Add Footer at the end */}
    </div>
  );
}

export default Layout;
