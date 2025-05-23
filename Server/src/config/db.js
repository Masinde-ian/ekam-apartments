// src/config/db.js
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Set strictQuery to true to avoid deprecation warnings
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;