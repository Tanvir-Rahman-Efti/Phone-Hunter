import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);  // Clear the cart on logout
    localStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    setNotification({ message: 'Added to cart successfully!', isVisible: true });
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItemCount={cart.length} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/products" />} />
          <Route path="/products" element={isLoggedIn ? <ProductList addToCart={addToCart} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={isLoggedIn ? <Cart items={cart} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/products" : "/login"} />} />
        </Routes>
        <Notification 
          message={notification.message} 
          isVisible={notification.isVisible} 
          setIsVisible={(isVisible) => setNotification(prev => ({ ...prev, isVisible }))}
        />
      </div>
    </Router>
  );
}

export default App;