require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// MongoDB Connection
console.log('Connecting to:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✓ MongoDB connected successfully to", mongoose.connection.name);
  })
  .catch(err => {
    console.error("✗ MongoDB connection error:", err);
  });

mongoose.connection.on('error', err => {
  console.error('Mongoose connection event error:', err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
