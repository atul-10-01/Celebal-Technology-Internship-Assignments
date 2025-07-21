import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingBag, User, Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SabBecho</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </a>
              <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </a>
              <a href="/deals" className="text-gray-700 hover:text-blue-600 transition-colors">
                Deals
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </a>
                <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Products
                </a>
                <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Categories
                </a>
                <a href="/deals" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Deals
                </a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </a>
              </nav>
              <div className="flex items-center justify-around mt-4 pt-4 border-t">
                <button className="p-2 text-gray-600">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600">
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-gray-600 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-gray-600">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">SabBecho</span>
              </div>
              <p className="text-gray-400">
                Your one-stop destination for all your shopping needs. Quality products at unbeatable prices.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/electronics" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="/clothing" className="hover:text-white transition-colors">Clothing</a></li>
                <li><a href="/home-garden" className="hover:text-white transition-colors">Home & Garden</a></li>
                <li><a href="/sports" className="hover:text-white transition-colors">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/track-order" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SabBecho. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <CheckoutProvider>
        <Router>
          <AppContent />
        </Router>
      </CheckoutProvider>
    </CartProvider>
  );
}

export default App;