import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = ({ cartItemCount, isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Phone Hunter</Link>
      </div>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li><Link to="/products"><FaHome /> Products</Link></li>
            <li><Link to="/cart"><FaShoppingCart /> Cart ({cartItemCount})</Link></li>
            <li onClick={onLogout}><FaSignOutAlt /> Logout</li>
          </>
        ) : (
          <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;