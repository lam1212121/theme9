import React from'react';
//rotas
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//componentes
import FormData from './pages/FormData';
import BuinessPage from './pages/Buiness-page';
import Confirm from './pages/Confirm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<FormData />} />
          <Route path='/buiness' element={<BuinessPage />} />
          <Route path='/confirm' element={<Confirm />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;