// src/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
        <div className="product-card">
          
          <img src={product.imagen} alt={product.nombre} className="product-image primary1" />
          <img src={product.imagen2} alt={product.nombre} className="product-image secondary1" />
          <div className="product-info">
            
            <span className="product-name">{product.nombre}</span>
            <div className="product-pricing">
              <span className="product-price">${product.precio}</span>
              <span className="product-old-price">${product.oldPrice}</span>
            </div>
          </div>  
          <div className="product-hover-info">
      <button className="add-to-cart-button">Agregar al Carrito</button>
    </div>
      </div>

  );
};

export default ProductCard;