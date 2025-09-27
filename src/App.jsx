import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import ProductListings from './components/ProductListings';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
