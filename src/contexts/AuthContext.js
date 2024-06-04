import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      document.cookie = `token=${response.data.token}; path=/;`;
      setIsAuthenticated(true);
      navigate('/dashboard');
      return null; // No error
    } catch (error) {
      console.error('Login failed:', error);
      return error.response?.data?.message || 'Login failed. Please try again.'; // Error message
    }
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    navigate('/login');
  };

  const verifyAuth = useCallback(async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (!token) {
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:4000/api/verified', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.verificado === true) {
        setIsAuthenticated(true);
      } else if (response.data.status === 'WARNING') {
        setIsAuthenticated(false);
        navigate(`/verifyAccount?id=${response.data.userId}`);
      } else {
        setIsAuthenticated(false);
        console.log("token not verified");
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const { userId } = error.response.data;
        navigate(`/verifyAccount?id=${userId}`);
      } else {
        console.error('Verification error:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    }
  }, [navigate]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);