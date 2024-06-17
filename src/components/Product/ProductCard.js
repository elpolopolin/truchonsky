import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const viewProduct = (id) => {
    navigate(`/viewproduct/${id}`);
  };

  return (
    <div className="product-card" onClick={() => viewProduct(product.id)}>
      <img src={product.imagen} alt={product.nombre} className="product-image primary1" />
      <img src={product.imagen2} alt={product.nombre} className="product-image secondary1" />
      <div className="product-info">
        <span className="product-name">{product.nombre}</span>
        <div className="product-pricing">
          <span className="product-price">${product.precio}</span>
          <span className="product-old-price">${product.oldPrice}</span>
        </div>
      </div>
     
    </div>
  );
};

export default ProductCard;