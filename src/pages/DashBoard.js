import React, { useEffect,useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
const [userData, setUserData] = useState('');
  
const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await axios.get('https://skilled-obviously-earwig.ngrok-free.app/api/userData', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
        console.log(response.data.user)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (isAuthenticated) {
      fetchUserData();
    } else {
      setUserData(null); 
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;