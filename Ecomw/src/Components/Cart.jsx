import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart();

  const formatPrice = (price) => {
    const mainPrice = Math.floor(price / 100);
    return `₹${mainPrice.toLocaleString('en-IN')}`;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({getTotalItems()}):</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>₹0</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;