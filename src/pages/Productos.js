import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import AllProducts from '../components/AllProducts/AllProducts';

const Productos = () => {
  const productsPerPage = 12;
  const productsPerPage2 = 8;
  const { producto: productoAbuscar } = useParams(); // Obtener el parámetro de la URL


  document.title = `Productos | Truchonsky`;

  return (
    <div className=''>
      {!productoAbuscar ? ( 
        <>
          <Navbar />
          <div className='container'>
            <AllProducts productsPerPage={productsPerPage} />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className='container'>
            <AllProducts productsPerPage={productsPerPage2} productoAbuscar={productoAbuscar} />
          </div>
        </>
      )}
    </div>
  );
};

export default Productos;