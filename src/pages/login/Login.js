import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";
import logo from "./assets/logo4.png";
import googleIcon from "./assets/google.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const { login, verifyAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await verifyAuth();
      setLoading(false);
    };
    checkAuth();
  }, [verifyAuth]);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const errorMessage = await login(email, password);
    if (errorMessage) {
      setError(errorMessage); // Establece el mensaje de error si el login falla
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
 


  return (
    <div className='login'>
      <form className="my-form" onSubmit={handleLogin}>

      <div className="login-welcome-row">
            <a href="#" title="Logo">
            <Link to="/">   <img src={logo} alt="Logo" className="logo" /> </Link>
            </a>
        </div>

        <div className="input__wrapper">
          <input type="email" id="email" name="email" className="input__field" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required autoComplete="off" />
          <label htmlFor="email" className="input__label">Email</label>
        </div>
        <div className="input__wrapper">
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="input__field" placeholder="Your Password" title="Minimum 6 characters at least 1 Alphabet and 1 Number" required autoComplete="off" />
          <label htmlFor="password" className="input__label">Password</label>
        </div>
        <button type="submit" className="my-form__button">Login</button>
        <div className="socials-row">
          <a href="#" title="Use Google">
            <img src={googleIcon} alt="Google" />
            Log in with Google
          </a>
        </div>
        <div className="my-form__actions">
          <div className="my-form__row">
            <span>Don't have an account?</span>
            <a href="#" title="Create Account">
              <Link to="/signup" className="signup-link">Sign Up</Link>
            </a>
          </div>
       
        </div>
       
      </form>
      {error && <div className="error-message">{error}</div>} 
    </div>
  );
};

export default Login;