import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { removeFromCart, removeItemCompletely, addToCart } = useCart();

  const formatPrice = (price) => {
    const mainPrice = Math.floor(price / 100);
    return `₹${mainPrice.toLocaleString('en-IN')}`;
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-category">{item.category}</p>
        <p className="item-price">{formatPrice(item.price)}</p>
      </div>
      <div className="item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
        <button 
          className="remove-btn"
          onClick={() => removeItemCompletely(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;