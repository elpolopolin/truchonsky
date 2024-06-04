import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { verifyAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await verifyAuth(navigate);
    };

    checkAuth();
  }, [verifyAuth, navigate]);


  return children;
};

export default PrivateRoute;