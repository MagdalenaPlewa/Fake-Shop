import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductListing from './components/ProductsListing';
import { ProductDetails } from './components/ProductDetails';
import { ProductsFiltering } from './components/ProductsFiltering';
import FiltersPanel from './components/FiltersPanel';

import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className='container'>
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProductListing/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/products/:category" element={<ProductsFiltering/>}/>
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
