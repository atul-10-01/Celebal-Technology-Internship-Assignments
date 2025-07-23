const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic root route
app.get('/', (req, res) => {
  res.send('Shipify Backend API');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const shipmentRoutes = require('./routes/shipments');
app.use('/api/shipments', shipmentRoutes);

// Health check route for MongoDB connection
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ mongoConnected: isConnected });
});

// TODO: Add user and shipment routes

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shipify';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 