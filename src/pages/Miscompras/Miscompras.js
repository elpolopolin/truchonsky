import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Miscompras.css';
import Navbar from '../../components/Navbar/Navbar';
//import CardCompra from "../../components/CardCompra/CardCompra.js"

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
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      try {
        const response = await fetch('https://skilled-obviously-earwig.ngrok-free.app/verComprasUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setCompras(data.comprasUser || []); // Asegúrate de que comprasUser exista
        console.log(data);
      } catch (error) {
        console.error('Error: ', error);
        setCompras([]); // Establece compras como un array vacío en caso de error
      }
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
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const verCompra = (id) =>{
    navigate(`/verCompra/${id}`);
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className="mis-compras">
          <h2>Mis compras</h2>
          <div className="compras-lista">
            {currentCompras.map((compra) => (
                <div onClick={() => verCompra(compra.payment_id)} className="card-compra">
                <h3>Compra #{compra.payment_id}</h3>
                <p><strong>Producto/s:</strong> </p>
                <p><strong>Precio Total:</strong> ${compra.totalCompra}</p>
                <p><strong>Fecha:</strong> {formatearFecha(compra.fecha_procesado)}</p>
              </div>
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