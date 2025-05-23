require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


// Route Imports
const authRoutes = require('./routes/authRoutes');
const unitRoutes = require('./routes/unitRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const leaseRoutes = require('./routes/leaseRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const  {protect}  = require('./middleware/authMiddleware');

const app = express();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/units', protect, unitRoutes);
app.use('/api/tenants', protect, tenantRoutes);
app.use('/api/leases', protect, leaseRoutes);
app.use('/api/maintenance', protect, maintenanceRoutes);
// app.use('/api/payments', protect, paymentRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
