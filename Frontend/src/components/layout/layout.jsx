import Header from './header.jsx';
import Footer from './footer.jsx';
import { Helmet } from 'react-helmet';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// eslint-disable-next-line react/prop-types
function Layout({ children,title,description,keywords,author }) {  // Destructure children from props
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content= {keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <ToastContainer />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />  
    </div>
  );
}

Layout.defaultProps = {
  title: 'Insta-Cart', 
  description: 'THIS IS A ECOMERCE SITE', 
  keywords: 'REACT NODE JS EXPRESS JS ', 
  author: 'IEM STUDENTS'   
};

export default Layout;
