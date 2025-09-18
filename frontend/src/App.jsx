import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import Products from './Products';
import CheckoutPage from './ProductCheckoutPage';
import AboutPage from './AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;