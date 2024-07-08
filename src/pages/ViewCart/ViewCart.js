import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './ViewCart.css'; // Asegúrate de tener tu archivo CSS para estilos personalizados

const ViewCart = () => {
  const { cart, removeFromCart, productCount } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productRequests = cart.map((productId) =>
        axios.get(`http://192.168.0.119:4000/api/getProduct/${productId}`)
      );
      try {
        const responses = await Promise.all(productRequests);
        const productsData = responses.map((response) => response.data.producto[0]);
        setCartProducts(productsData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    }
  }, [cart]);

 
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach((product) => {
      const quantity = productCount[product.id] || 0;
      totalPrice += product.precio * quantity;
    });
    return totalPrice;
  };

  return (
    <>
      <Navbar />
      <div className='container'>
      
        <div className='cart-layout'>
          <div className='cart-products'>
            {cartProducts.map((product) => (
              <div key={product.id} className='cart-product'>
                <img src={product.imagen} alt={product.nombre} className='cart-product-image' />
                <div className='cart-product-details'>
                  <h3 className='cart-product-name'>{product.nombre}</h3>
                  <div className='cart-product-pricing'>
                    <span className='cart-product-price'>${product.precio}</span>
                    <span className='cart-product-quantity'>Cantidad: {productCount[product.id]}</span>
                  </div>
                </div>
                <button className='remove-from-cart' onClick={() => removeFromCart(product.id)}>
                  &#10005;
                </button>
              </div>
            ))}
            {cart.length === 0 && <div  className='cart-product'><div className='cart-product-details'><h3>No hay productos en el carrito.</h3></div></div>}
          </div>

          <div className='cart-summary'>
            <h2>Resumen de la Compra:</h2>
            <div className='cart-summary-details'>
              <div className='summary-item'>
                <span>Total Productos:</span>
                <span>${getTotalPrice()}</span>
              </div>
             
              <button className='pay-button'>Pagar</button>
              <button className='clear-cart-button'>Eliminar Carrito</button>
             
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default ViewCart;