import '../styles/style.css';
import '../styles/backgrounds.css';
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [profile, setProfile] = useState({});
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [returnPhone, setReturnPhone] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/shops/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await API.get('/customers');
        setCustomers(res.data);
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/analytics');
        setAnalytics(res.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchProfile();
    fetchCustomers();
    fetchAnalytics();
  }, []);

  const handleMarkPaid = async () => {
    try {
      await API.post('/shops/mark-paid');
      alert('Subscription activated! Reloading...');
      window.location.reload();
    } catch (err) {
      alert('Failed to mark paid.');
      console.error(err);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter name and phone');
      return;
    }

    try {
      const res = await API.post('/customers/register', { name, phone });

      alert('Customer added!');
      setCustomers((prev) => [...prev, res.data]);
      setQrImage(res.data.qr_code);
      setName('');
      setPhone('');
    } catch (err) {
      const msg = err.response?.data?.error || 'Add failed';
      alert(`Error: ${msg}`);
      console.error('Add Error:', msg);
    }
  };

  const handleReturnVisit = async (e) => {
    e.preventDefault();
    if (!returnPhone) {
      alert('Please enter phone number');
      return;
    }

    try {
      const res = await API.post('/customers/register', {
        name: 'Returning',
        phone: returnPhone,
      });

      const updated = res.data;
      setCustomers((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setQrImage(res.data.qr_code);
      setReturnPhone('');

      if (updated.total_visits % 5 === 0) {
        alert(`🎉 Customer ${updated.name} has earned a reward! 🌸🌸🌸`);
      } else {
        alert(`Welcome back, ${updated.name}! Visit ${updated.total_visits}`);
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Update failed';
      alert(`Error: ${msg}`);
      console.error('Visit Error:', msg);
    }
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return alert('Please enter feedback');

    try {
      await API.post('/feedback', { message: feedbackMsg });
      alert('✅ Feedback sent. Thank you!');
      setFeedbackMsg('');
    } catch (err) {
      alert('Could not send feedback');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="container">
        <img src="/logo.png" alt="Logo" className="logo centered-logo" />

        <h1 className="welcome-banner">
          👋 Hello,{' '}
          <span className="shop-name">{profile.name || 'Shop Owner'}</span>!
          Welcome to your dashboard 🌺🌼✨
        </h1>

        {customers.length > 0 && (
          <div className="top-summary">
            <h2>🌟 Top Customers</h2>
            <p>
              🥇 <strong>Most Visits:</strong>{' '}
              {
                [...customers].sort(
                  (a, b) => b.total_visits - a.total_visits
                )[0].name
              }{' '}
              (
              {
                [...customers].sort(
                  (a, b) => b.total_visits - a.total_visits
                )[0].total_visits
              }{' '}
              visits)
            </p>
            <p>
              🏆 <strong>Most Rewards:</strong>{' '}
              {
                [...customers].sort(
                  (a, b) => b.total_rewards - a.total_rewards
                )[0].name
              }{' '}
              (
              {
                [...customers].sort(
                  (a, b) => b.total_rewards - a.total_rewards
                )[0].total_rewards
              }{' '}
              rewards)
            </p>
          </div>
        )}

        {analytics && (
          <div className="analytics-panel">
            <h2>📊 This Week & Month</h2>
            <p>
              📅 Visits this Week: <strong>{analytics.week}</strong>
            </p>
            <p>
              📆 Visits this Month: <strong>{analytics.month}</strong>
            </p>
            <p>
              🌸 Rewards Given: <strong>{analytics.rewards}</strong>
            </p>
            <h3>🏅 Top 3 Customers</h3>
            <ul>
              {analytics.top_customers.map((c) => (
                <li key={c.phone}>
                  {c.name} — {c.total_visits} visits
                </li>
              ))}
            </ul>
          </div>
        )}

        {profile.subscription_status === 'inactive' && (
          <div>
            <p>
              <strong>Subscription:</strong> Inactive
            </p>
            <p>
              <strong>Pay KES 200 to:</strong>
            </p>
            <p>
              <strong>Paybill:</strong> 572536
            </p>
            <p>
              <strong>Account:</strong> 0748170164
            </p>
            <button type="button" onClick={handleMarkPaid}>
              Mark as Paid
            </button>
          </div>
        )}

        <h2>➕ New Customer</h2>
        <form onSubmit={handleAddCustomer}>
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>

        <h2>🔁 Returning Customer</h2>
        <form onSubmit={handleReturnVisit}>
          <input
            type="text"
            placeholder="Phone"
            value={returnPhone}
            onChange={(e) => setReturnPhone(e.target.value)}
          />
          <button type="submit">Mark Visit</button>
        </form>

        {qrImage && (
          <div style={{ marginTop: '20px' }}>
            <h3>📱 Customer QR Code</h3>
            <img src={qrImage} alt="QR Code" width={200} />
          </div>
        )}

        <h2>✉️ Send Feedback</h2>
        <form onSubmit={handleSendFeedback}>
          <textarea
            placeholder="How can we improve?"
            value={feedbackMsg}
            onChange={(e) => setFeedbackMsg(e.target.value)}
            rows={3}
            style={{ width: '100%', marginBottom: '8px' }}
          />
          <button type="submit">Send</button>
        </form>

        <h2>📋 Customers</h2>
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              {c.name} ({c.phone}) — Visits: {c.total_visits}, Rewards:{' '}
              {c.total_rewards}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
