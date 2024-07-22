import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';
import './ViewProduct.css';
import Navbar from '../Navbar/Navbar';

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showCard, setShowCard] = useState(false); // Estado para controlar la visibilidad de la tarjeta

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://skilled-obviously-earwig.ngrok-free.app/api/getProduct/${id}`);
        const data = response.data;
        if (data.status === 'ok') {
          setProduct(data.producto[0]);
        } else {
          console.error('Error in response:', data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  
  useEffect(() => {
    if (product) {
      document.title = `${product.nombre} | Truchonsky`; 
    }
  }, [product]);


  if (!product) {
    return <div>Loading...</div>;
  }


  const handleAddToCart = () => {
    addToCart(product.id); // Aquí pasamos solo el ID del producto
    setShowCard(true); // Mostrar la tarjeta cuando se añade el producto al carrito
    setTimeout(() => {
      setShowCard(false); // Ocultar la tarjeta después de 3 segundos
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className="view-product-container">
          <div className="view-product">
            <div className="product-image-block">
              <img src={product.imagen} alt={product.nombre} className="product-image2" />
              <h1 className="product-name">{product.nombre}</h1>
              <span className="product-category">/Productos/{product.categoria_nombre}</span>
            </div>
            <div className="product-details">
              <div className="product-info-box">
                <p className="product-description">{product.descripcion}</p>
              </div>
            </div>
            <div className="product-pricing2">
              <span className="product-price">${product.precio}</span>
              <span className="product-old-price">${product.oldPrice}</span>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCard && (
        <div className="add-to-cart-card">
          <p>{product.nombre} ha sido añadido al carrito.</p>
        </div>
      )}
    </>
  );
};

export default ViewProduct;