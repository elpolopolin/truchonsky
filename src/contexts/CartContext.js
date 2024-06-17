import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    try {
      return savedCart ? JSON.parse(savedCart) : []; // Parse and default to empty array
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return []; // Default to empty array on parsing error
    }
  });

  const [productCount, setProductCount] = useState({});

  useEffect(() => {
    // Initialize productCount from cart
    const initialProductCount = {};
    cart.forEach((productId) => {
      initialProductCount[productId] = initialProductCount[productId] ? initialProductCount[productId] + 1 : 1;
    });
    setProductCount(initialProductCount);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart.includes(productId)) {
        return [...prevCart, productId];
      }
      return prevCart;
    });
    setProductCount((prevCount) => ({
      ...prevCount,
      [productId]: (prevCount[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item !== productId));
    setProductCount((prevCount) => {
      const updatedCount = { ...prevCount };
      if (updatedCount[productId] > 1) {
        updatedCount[productId] -= 1;
      } else {
        delete updatedCount[productId];
      }
      return updatedCount;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, productCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };