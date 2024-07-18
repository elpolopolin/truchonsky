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
import ViewProduct from './components/ViewProduct/ViewProduct';
import ViewCart from './pages/ViewCart/ViewCart';
import { CartProvider } from './contexts/CartContext';
import Productos from './pages/Productos';
import Miscompras from './pages/Miscompras/Miscompras';
import Footer from './components/footer/Footer';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />
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
          <Route path="/productos" element={<Productos />} />
          <Route path="/buscarProducto/:producto" element={<Productos />} />
          <Route path="/viewproduct/:nombre/:id" element={<ViewProduct />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/miscompras" element={<Miscompras />} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;