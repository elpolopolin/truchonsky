import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './MiCompra.css';

const MiCompra = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompra = async () => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

      try {
        const response = await axios.get(`https://skilled-obviously-earwig.ngrok-free.app/verCompra/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCompra(response.data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Error desconocido');
        } else if (error.request) {
          setError('Error de red, por favor intente de nuevo');
        } else {
          setError('Error al realizar la solicitud');
        }
        setCompra(null);
      }
    };
    
    fetchCompra();
  }, []);

  useEffect(() => {
    if (compra) {
      document.title = `Compra ${compra[0]?.paymentId} | Truchonsky`;
    }
  }, [compra]);

  // Consolidar productos para mostrar cada producto una sola vez con la cantidad total
  const consolidatedProducts = compra?.reduce((acc, item) => {
    const existingProduct = acc.find(p => p.producto.id === item.producto.id);
    if (existingProduct) {
      existingProduct.cantidad += item.cantidad;
      existingProduct.codigosItems = [...new Set([...existingProduct.codigosItems, ...item.codigosItems])];
    } else {
      acc.push({
        ...item,
        codigosItems: [...item.codigosItems]
      });
    }
    return acc;
  }, []);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        {error && <div className='error-message'>{error}</div>}
        {!compra && !error && <div>Loading...</div>}
        {compra && (
          <>
            <div className='progreso-compra'>
              <h2 className='indones'>Progreso de la Compra</h2>
              <div className='progreso-steps'>
                <div className={`step ${compra[0]?.estado >= 1 ? 'completed' : ''}`}>
                  <span>Pago Confirmado</span>
                </div>
                <div className={`step ${compra[0]?.estado >= 2 ? 'completed' : ''}`}>
                  <span>Pedido Procesado</span>
                </div>
                <div className={`step ${compra[0]?.estado >= 3 ? 'completed' : ''}`}>
                  <span>{compra[0]?.entrega === 'delivery' ? 'Pedido Embalado' : 'Pedido Listo para Retirar'}</span>
                </div>
                <div className={`step ${compra[0]?.estado >= 4 ? 'completed' : ''}`}>
                  <span>{compra[0]?.entrega === 'delivery' ? 'Pedido en Camino' : 'Pedido Retirado/Despachado'}</span>
                </div>
              </div>
            </div>
            
            <div className='compra-details'>
              <div className='jeje'>
                <h2>Detalles de la Compra</h2>
               
                <p><strong>Payment ID:</strong> {compra[0]?.paymentId}</p>
                <p><strong>Fecha de compra:</strong>  {formatearFecha(compra[0].fechadeventa)}</p>
                <p><strong>Precio Total:</strong> </p>
                
              </div>

              <div className='table-container'>
                <table className='product-table'>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consolidatedProducts.map((producto, index) => (
                      <tr key={index}>
                        <td><img src={producto.producto.imagen} alt={producto.producto.nombre} className='producto-img' /></td>
                        <td className='item-name'>{producto.producto.nombre}</td>
                        <td className='item-price'>${producto.producto.precio}</td>
                        <td className='item-quantity'>{producto.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MiCompra;