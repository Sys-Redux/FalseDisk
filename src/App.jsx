import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import ProductListings from './components/ProductListings';
import AddProduct from './components/AddProduct';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
