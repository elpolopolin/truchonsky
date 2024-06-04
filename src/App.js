import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Dashboard from './pages/DashBoard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import './App.css';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Home />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;