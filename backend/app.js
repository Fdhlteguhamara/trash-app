require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const reportRoutes = require('./routes/reportRoutes');
app.use('/api', reportRoutes);

app.get('/', (req, res) => {
  res.send('Trash App API Running');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});