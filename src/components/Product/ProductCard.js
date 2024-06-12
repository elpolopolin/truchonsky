// src/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image1} alt={product.name} className="product-image primary1" />
      <img src={product.image2} alt={product.name} className="product-image secondary1" />
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <div className="product-pricing">
          <span className="product-price">${product.price}</span>
          <span className="product-old-price">${product.oldPrice}</span>
        </div>
      </div>
      <div className="product-hover-info">
        <span className="product-stock">Stock: {product.stock}</span>
        <button className="add-to-cart-button">Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;