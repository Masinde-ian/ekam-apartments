// src/models/Lease.js
const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['active', 'terminated'], default: 'active' },
  rentPayed: { type: Boolean, default: false } // Add this field
});

// Simple method to confirm payment and renew lease
leaseSchema.methods.confirmPaymentAndRenew = function(newEndDate) {
  this.paymentConfirmed = true;
  this.endDate = newEndDate;
  return this.save();
};

module.exports = mongoose.model('Lease', leaseSchema);