import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import UserProfile from "./pages/Profile";

import About from "./pages/aboutpage";
import Shop from "./pages/Shop";
import Contact from "./pages/contact";

import Layout from "./components/common/Layout";

import { WishlistProvider } from "./components/products/WishlistContext";
import { CartProvider } from "./components/products/CartContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Layout>
            <Routes>

              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Product */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* User */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/account" element={<UserProfile />} />

              {/* Wishlist */}
              <Route path="/wishlist" element={<Wishlist />} />

              {/* Cart */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;