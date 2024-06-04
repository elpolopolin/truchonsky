import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('id');
  const { logout, verifyAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/verifyOTP', {
        userId,
        otp,
      });
      if (response.data.status === 'VERIFIED') {
        logout(navigate);
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError('Verification failed. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:4000/resendOTP', {
        userId,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className='login'>
      <form className="my-form" onSubmit={handleSubmit}>
        <div className="login-welcome-row">
          <a href="#" title="Logo">
          </a>
        </div>
        <div className="input__wrapper">
          <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="input__field" placeholder="OTP" required autoComplete="off" />
          <label htmlFor="otp" className="input__label">OTP</label>
        </div>
        <button type="submit" className="my-form__button">Verify</button>
        <p className="login-info">After you have verified your account, you will be redirected to the login page.</p>
     
      {error && <p className="error-message">{error}</p>}
      <button className="my-form__button" onClick={handleResendOTP}>Resend OTP</button>
      <button className="my-form__button" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default VerifyAccount;