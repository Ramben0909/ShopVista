// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/context/authcontext.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policy from './pages/Policy.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Auth/register.jsx';
import 'react-toastify/dist/ReactToastify.css';
import DummyProfile from './pages/DummyProfile.jsx';


import MyCart from './pages/MyCart.jsx';
import ProductDetails from './pages/ProductDetails.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dummyprofile" element={<DummyProfile />} /> {/* Add DummyProfile route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
