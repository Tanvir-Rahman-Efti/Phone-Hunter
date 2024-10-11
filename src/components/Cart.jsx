import React from 'react';

const Cart = ({ items }) => {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p className="item-price">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;