import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import '../../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="http://192.168.0.132:3000/img/logo4.png" alt="Logo" />
        </div>
        <div className="footer-links">
          <Link to="/productos" className="footer-link">Productos</Link>
          <Link to="/ofertas" className="footer-link">Ofertas</Link>
          <Link to="/contacto" className="footer-link">Contacto</Link>
          <Link to="/terminos-y-condiciones" className="footer-link">Términos y Condiciones</Link>
        </div>
        <div className="footer-newsletter">
          <h4>Suscríbete a nuestro newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;