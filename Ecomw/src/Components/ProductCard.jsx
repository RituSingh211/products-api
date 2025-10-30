import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const formatPrice = (price) => {
    const mainPrice = Math.floor(price / 100);
    return `₹${mainPrice.toLocaleString('en-IN')}`;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {/* {quantity > 0 && (
          <div className="cart-badge">{quantity} in cart</div>
        )} */}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <p className="product-price">{formatPrice(product.price)}</p>
          
          {quantity > 0 ? (
            <div className="quantity-controls-product">
              <button 
                className="quantity-btn minus"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn plus"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className={`add-to-cart-btn ${!product.inStock ? 'sold-out' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;