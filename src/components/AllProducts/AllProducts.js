import React, { useEffect, useState } from 'react';
import './allproducts.css'
import ProductCard from '../Product/ProductCard';
import axios from 'axios';

const AllProducts = ({ productsPerPage }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://192.168.0.119:4000/api/getProducts');
        setProducts(response.data.AllProducts);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic for displaying products on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <span className="category">Categoría</span>
        <span className="filter">Filtrar</span>
      </div>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AllProducts;