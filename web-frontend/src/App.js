import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Fetch the greeting from the backend
    fetch('http://localhost:5000/api/greeting')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('Failed to fetch from backend:', err);
        setMessage('Failed to load message. Is the backend running?');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>React Frontend</h1>
      <p>Message from backend:</p>
      <p style={{ color: '#007BFF', fontSize: '1.2em', fontWeight: 'bold' }}>{message}</p>
    </div>
  );
}

export default App;