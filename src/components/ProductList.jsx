import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhones('iphone'); // Initial search for some default products
  }, []);

  const fetchPhones = async (searchText) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
      if (!response.ok) throw new Error('Failed to fetch phone list');
      const data = await response.json();
      
      if (data.status && data.data.length > 0) {
        setProducts(data.data);
      } else {
        setProducts([]);
        setError('No phones found. Try a different search term.');
      }
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchPhones(searchTerm);
    }
  };

  const generateRandomPrice = () => {
    return (Math.random() * (1500 - 300) + 300).toFixed(2);
  };

  return (
    <div className="product-list-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for phones..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>

      {loading && <div className="loading">Searching for phones...</div>}
      {error && <div className="error">{error}</div>}

      <div className="product-list">
        {products.map((product) => (
          <div key={product.slug} className="product-card">
            <img src={product.image} alt={product.phone_name} />
            <h3>{product.phone_name}</h3>
            <p className="brand">{product.brand}</p>
            <p className="price">${generateRandomPrice()}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;