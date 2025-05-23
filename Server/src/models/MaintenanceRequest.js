// src/models/MaintenanceRequest.js
const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  description: String,
  status: { type: String, enum: ['open', 'in progress', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  // solutionDate: { type: Date, default: null },
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);