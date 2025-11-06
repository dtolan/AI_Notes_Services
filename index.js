const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable Cross-Origin Resource Sharing

app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello from the Node.js Backend!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));