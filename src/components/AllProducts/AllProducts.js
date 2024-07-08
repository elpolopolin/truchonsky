  import React, { useEffect, useState } from 'react';
  import './allproducts.css';
  import ProductCard from '../Product/ProductCard';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const AllProducts = ({ productsPerPage, productoAbuscar }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [showInput, setShowInput] = useState(false);
    const [filtroNombre, setFiltroNombre] = useState(''); 
    const [filtroPrecio, setFiltroPrecio] = useState(''); 
    const [filtroCategoria, setFiltroCategoria] = useState(''); 

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          if (productoAbuscar) {
            const response = await axios.get('http://192.168.0.119:4000/api/productSearch', { params: { nombre: productoAbuscar } });
            if (response.data.status === 'ok') {
              setProducts(response.data.products);
              setErrorMessage('');
            } else {
              setProducts([]);
              setErrorMessage(response.data.message);
            }
          } else {
            const response = await axios.get('http://192.168.0.119:4000/api/getProducts');
            setProducts(response.data.AllProducts);
            setErrorMessage('');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
          setErrorMessage('Error al cargar los productos. Por favor, intenta nuevamente más tarde.');
        }
      };

      fetchProducts();
    }, [productoAbuscar]);

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

    const buscarProducto = (input) => {
      if (input.trim() !== '') {
        navigate(`/buscarProducto/${input}`);
        toggleInputVisibility()
      } else {
        navigate(`/productos`);
        toggleInputVisibility()
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        buscarProducto(input);
      }
    };
    const openModal = () => {
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
    };
    const aplicarFiltros = () => {
    
      closeModal();
    };
    const toggleInputVisibility = () => {
      setShowInput(!showInput); 
    };

    return (
      <div className="products-container">
        
        <div className="products-header">
      
        {showInput ? (
          <div className='inputcontainer'>
            <input
              placeholder="Buscar..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='input_allproducts'
              onKeyDown={handleKeyDown}
              onBlur={() => buscarProducto(input)}
              
              autoFocus // Enfoca automáticamente el input al mostrarse
            />
          </div>
        ) : (
          <span className='filter' onClick={toggleInputVisibility}>BUSCAR</span>
        )}
        <span className='filter' onClick={openModal}>FILTRAR</span>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {products.length > 0 ? (
          <div className="products-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-message">
            No se encontraron productos.
          </div>
        )}

      
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
      

          {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Filtrar Productos</h2>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  className="header-input"
                />
                <input
                  type="text"
                  placeholder="Precio"
                  value={filtroPrecio}
                  onChange={(e) => setFiltroPrecio(e.target.value)}
                  className="header-input"
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="header-input"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={aplicarFiltros}>Aplicar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  export default AllProducts;