import React, { useState } from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from './pages/Contact.jsX';
import Policy from './pages/Policy.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/Conatct' element={<Contact />}/>
        <Route path='/Policy' element={<Policy />}/>
        <Route path='/PageNotFound' element={<PageNotFound/>}/>
       
      </Routes>
    </>
  );
}

export default App;
