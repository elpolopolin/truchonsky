import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  const [productCount, setProductCount] = useState(() => {
    const savedProductCount = localStorage.getItem('productCount');
    try {
      return savedProductCount ? JSON.parse(savedProductCount) : {};
    } catch (error) {
      console.error('Error parsing product count from localStorage:', error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('productCount', JSON.stringify(productCount));
  }, [productCount]);

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
    setProductCount((prevCount) => {
      const updatedCount = { ...prevCount };
      if (updatedCount[productId] > 1) {
        updatedCount[productId] -= 1;
      } else {
        delete updatedCount[productId];
      }
      return updatedCount;
    });

    setCart((prevCart) => {
      if (productCount[productId] === 1) {
        return prevCart.filter((item) => item !== productId);
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, productCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };