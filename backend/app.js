require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API
const reportRoutes = require('./routes/reportRoutes');
app.use('/api', reportRoutes);

// fallback (FIX ERROR DI SINI)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});