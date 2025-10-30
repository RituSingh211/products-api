import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CartSidebar from './CartSidebar';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        if (data && data.products) {
          const transformedProducts = data.products.map(product => ({
            id: product.id,
            name: product.title,
            price: Math.round(product.price * 100),
            image: product.thumbnail,
            inStock: product.stock > 0,
            description: product.description,
            category: product.category
          }));
          setProducts(transformedProducts);
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home">
      <header className="home-header">
        <h1>Product Listing</h1>
        <p>Discover our amazing products</p>
        
      </header>
      
      <div className="home-container">
        <div className="products-section">
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
        
        <CartSidebar />
      </div>
    </div>
  );
};

export default Home;