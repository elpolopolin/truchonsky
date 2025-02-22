import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './ViewCart.css'; // Asegúrate de tener tu archivo CSS para estilos personalizados

const ViewCart = () => {
  const { cart, removeFromCart, productCount } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productRequests = cart.map((productId) =>
        axios.get(`https://skilled-obviously-earwig.ngrok-free.app/api/getProduct/${productId}`)
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

  const createCheckoutButton = (preferenceId) => {
    const mp = new window.MercadoPago('APP_USR-faf28c5c-0434-4f3b-92e3-67373bf5c5f3', { // OCULTAR!!!
      locale: 'es-AR'
    });

    mp.checkout({
      preference: {
        id: preferenceId
      },
      render: {
        container: '.mercado-pago-button', // Clase CSS en la que se renderizará el botón
        label: 'Pagar con Mercado Pago', // Texto del botón
      }
    });
  };

  const handlePaymentClick = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const cartData = cartProducts.map((product) => ({
      id: product.id,
      count: productCount[product.id] || 0,
    }));
    console.log(cartData)
    try {
      const response = await fetch(`https://skilled-obviously-earwig.ngrok-free.app/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cartData }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || errorResponse.error || 'Error al crear la preferencia');
      }

      const preference = await response.json();
      createCheckoutButton(preference.id);
      setShowModal(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || error.error);
      console.error('Error creating preference:', error);
      
      // Configurar el mensaje de error para desaparecer después de 5 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          </div>

          <div className='cart-summary'>
            <h2>Resumen de la Compra:</h2>
            <div className='cart-summary-details'>
              <div className='summary-item'>
                <span>Total Productos:</span>
                <span>${getTotalPrice()}</span>
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar mensaje de error */}
              <button className='pay-button' onClick={handlePaymentClick}>Pagar</button>
              <button className='clear-cart-button'>Eliminar Carrito</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-button' onClick={handleCloseModal}>&times;</span>
            <h2>Elige un método de pago</h2>
            <div className='mercado-pago-button'></div> {/* El botón de Mercado Pago se renderizará aquí */}
            <button className='payment-button transferencia'>Transferencia Bancaria</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCart;