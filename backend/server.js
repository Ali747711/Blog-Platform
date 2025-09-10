require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/utils/db');
const authRoutes = require('./src/routes/auth');
const postsRoutes = require('./src/routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});