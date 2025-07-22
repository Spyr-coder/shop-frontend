import React, { useState } from 'react';
import API from '../services/api';

export default function ScanQR() {
  const [qrData, setQrData] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/visits/add', { qrData });
      alert(`Visit recorded! Total visits: ${res.data.totalVisits}`);
    } catch (err) {
      console.error(err);
      alert('Scan failed');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Scan QR</h1>
      <form onSubmit={handleScan}>
        <input
          type="text"
          placeholder="Paste QR data"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Record Visit
        </button>
      </form>
    </div>
  );
}
