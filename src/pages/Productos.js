import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AllProducts from '../components/AllProducts/AllProducts';

const Productos = () => {
  const productsPerPage = 12; 

  return (
    <div className=''>
      <Navbar />
      <div className='container'>
        <AllProducts productsPerPage={productsPerPage} />
      </div>
    </div>
  );
};

export default Productos;