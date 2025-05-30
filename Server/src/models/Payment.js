// src/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  leaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lease' },
  amount: Number,
  paidAt: { type: Date, default: Date.now },
  // month: String,
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
});

module.exports = mongoose.model('Payment', paymentSchema);