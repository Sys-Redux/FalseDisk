import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import ProductListings from './components/ProductListings';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
