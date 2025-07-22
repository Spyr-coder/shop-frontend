import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Submitting:', { name, phone, password });

    try {
      const res = await API.post('/shops/register', {
        name: name.trim(),
        phone: phone.trim(),
        password: password.trim(),
      });
      console.log('Server response:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err.response ? err.response.data : err);
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Register Shop</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>

      {/* 🔐 Login link */}
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'underline' }}>
          Login here
        </Link>
      </p>
    </div>
  );
}
