import React from 'react';
import './Cardcompra.css';

const CardCompra = ({ compra }) => {
  return (
    <div className="card-compra">
      <h3>Compra #{compra.payment_id}</h3>
      <p><strong>Producto:</strong> </p>
      <p><strong>Precio Total:</strong> ${compra.totalCompra} $</p>
      <p><strong>Fecha:</strong> {compra.fecha}</p>
    </div>
  );
};
export default CardCompra;