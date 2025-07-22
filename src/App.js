import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import ScanQR from './pages/ScanQR';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/scan-qr" element={<ScanQR />} />
      </Routes>
    </Router>
  );
}

export default App;
