import React from 'react';
import './Cardcompra.css';

const CardCompra = ({ compra }) => {
  return (
    <div className="card-compra">
      <h3>Compra #{compra.id}</h3>
      <p><strong>Producto:</strong> {compra.producto}</p>
      <p><strong>Cantidad:</strong> {compra.cantidad}</p>
      <p><strong>Precio Total:</strong> ${compra.precioTotal}</p>
      <p><strong>Fecha:</strong> {compra.fecha}</p>
    </div>
  );
};

export default CardCompra;