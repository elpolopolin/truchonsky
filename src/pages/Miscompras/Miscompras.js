import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardCompra from '../../components/CardCompra/CardCompra ';
import './Miscompras.css';
import Navbar from '../../components/Navbar/Navbar';

const comprasPerPage = 4;

const Miscompras = () => {
  const [compras, setCompras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
    
    const fetchCompras = async () => {
      const exampleCompras = [
        {
          id: 1,
          producto: 'Producto 1',
          cantidad: 2,
          precioTotal: 500,
          fecha: '2023-07-01',
        },
        {
          id: 2,
          producto: 'Producto 2',
          cantidad: 1,
          precioTotal: 300,
          fecha: '2023-07-05',
        },
        {
          id: 3,
          producto: 'Producto 3',
          cantidad: 4,
          precioTotal: 800,
          fecha: '2023-07-10',
        },
        {
          id: 4,
          producto: 'Producto 4',
          cantidad: 1,
          precioTotal: 150,
          fecha: '2023-07-15',
        },
        {
          id: 5,
          producto: 'Producto 5',
          cantidad: 3,
          precioTotal: 450,
          fecha: '2023-07-20',
        },
      ];
      setCompras(exampleCompras);
    };

    fetchCompras();
  }, []);

  const indexOfLastCompra = currentPage * comprasPerPage;
  const indexOfFirstCompra = indexOfLastCompra - comprasPerPage;
  const currentCompras = compras.slice(indexOfFirstCompra, indexOfLastCompra);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(compras.length / comprasPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className="mis-compras">
          <h2>Mis compras</h2>
          <div className="compras-lista">
            {currentCompras.map((compra) => (
              <CardCompra key={compra.id} compra={compra} />
            ))}
          </div>
          {pageNumbers.length > 1 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Miscompras;