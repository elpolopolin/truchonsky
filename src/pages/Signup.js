import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import logo from "./login/assets/logo4.png"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {  isAuthenticated,login } = useAuth();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.0.119:4000/api/register', {
        username,
        email,
        password,
        phone
      });
      if (response.data.status === 'ok') {
        const errorMessage = await login(email, password);
        if (errorMessage) {
          setError(errorMessage); // si no logea marca error en variable
        }
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className='login'>
      {error && <div className="error-message">{error}</div>} 
      <form className="my-form" onSubmit={handleSignup}>

      <div className="login-welcome-row">
            <a href="#" title="Logo">
            <Link to="/">   <img src={logo} alt="Logo" className="logo2" /> </Link>
            </a>
        </div>

        <div className="input__wrapper">
          <input type="text" id="username" name="username" className="input__field2" onChange={(e) => setUsername(e.target.value)} placeholder="Your Username" required autoComplete="off" />
          <label htmlFor="username" className="input__label">Username</label>
        </div>

        <div className="input__wrapper">
          <input type="email" id="email" name="email" className="input__field2" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required autoComplete="off" />
          <label htmlFor="email" className="input__label">Email</label>
        </div>

        <div className="input__wrapper">
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="input__field2" placeholder="Your Password" title="Minimum 6 characters at least 1 Alphabet and 1 Number" required autoComplete="off" />
          <label htmlFor="password" className="input__label">Password</label>
        </div>

        <div className="input__wrapper">
          <input type="tel" id="phone" name="phone" className="input__field2" onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone" required autoComplete="off" />
          <label htmlFor="phone" className="input__label">Phone</label>
        </div>

        <button type="submit" className="my-form__button">Sign Up</button>

        <div className="my-form__actions">
          <div className="my-form__row">
            <span>Already have an account?</span>
            <Link to="/login" className="signup-link">Login</Link>
          </div>
        </div>

      </form>
      
    </div>
  );
};

export default Signup;