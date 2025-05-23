// src/models/Unit.js
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  name: String,
  houseType: { type: String, enum: ['bed-sitter', '1-bedroom', '2-bedroom', 'other'], default: '1-bedroom' },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  rent: Number
});

module.exports = mongoose.model('Unit', unitSchema);
