import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('Loading backend...');

  const API_URL = import.meta.env.VITE_API_URL || 'https://campuseats-api-5xai.onrender.com';

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((err) => setStatus('Backend connection failed'));
  }, [API_URL]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>CampusEats Dashboard</h1>
      <p><strong>API Connection Status:</strong> {status}</p>
    </div>
  );
}