import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './SideCart.css';

const CartSidebar = () => {
  const { cart, removeItemCompletely, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const mainPrice = Math.floor(price / 100);
    return `₹${mainPrice.toLocaleString('en-IN')}`;
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-sidebar">
        <div className="sidebar-header">
          <h3>Your Cart</h3>
          <span className="item-count">0 items</span>
        </div>
        <div className="empty-sidebar">
          <p>Your cart is empty</p>
          <span>Add some products to see them here</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-sidebar">
      <div className="sidebar-header">
        <h3>Your Cart</h3>
        <span className="item-count">{getTotalItems()} items</span>
      </div>
      
      <div className="sidebar-items">
        {cart.map(item => (
          <div key={item.id} className="sidebar-item">
            <div className="item-info">
              <h4 className="item-name">{item.name}</h4>
              <div className="item-details">
                <span className="item-quantity">Qty: {item.quantity}</span>
                <span className="item-price">{formatPrice(item.price)}</span>
              </div>
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeItemCompletely(item.id)}
              title="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <div className="sidebar-total">
          <span>Total:</span>
          <span className="total-price">{formatPrice(getTotalPrice())}</span>
        </div>
        <button className="view-cart-btn" onClick={handleViewCart}>
          View Full Cart
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;