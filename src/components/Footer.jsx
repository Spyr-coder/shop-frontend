// ✅ src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
        fontSize: '0.9rem',
        color: '#555',
      }}
    >
      &copy; {new Date().getFullYear()} Barber Shop & Salon. All rights
      reserved.
      <br />
      Visit us on Instagram:{' '}
      <a href="https://instagram.com" target="_blank" rel="noreferrer"></a>
    </footer>
  );
}
