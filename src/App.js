import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductListing from './components/ProductsListing';
import { ProductDetails } from './components/ProductDetails';
import { ProductsFiltering } from './components/ProductsFiltering';
import Wishlist from './components/Wishlist';
import ProductsSearching from './components/ProductsSearching';
import { Cart } from './components/Cart';

function App() {

  return (
    <div className='container'>


        <Header/>
          <Routes>
            <Route path='/' exact element={<ProductListing/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/products/:category" element={<ProductsFiltering/>}/>
            <Route path="/products-searching/:inputValue" element={<ProductsSearching/>}/>
            <Route exact path="/wishlist" element={<Wishlist/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
          </Routes>
    </div>
  );
}

export default App;
