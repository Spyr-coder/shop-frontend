// ✅ src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/style.css';
import '../styles/backgrounds.css'; // ✅ Make sure this is included

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { saveToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ FIXED: Changed '/auth/login' to '/shops/login'
      const res = await API.post('/shops/login', { phone, password });
      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="container">
        <h1>Shop Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
