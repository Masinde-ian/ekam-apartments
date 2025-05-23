const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  leaseStart: {
    type: Date,
    required: true,
  },
  leaseEnd: {
    type: Date,
    required: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated'],
    default: 'active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tenant', tenantSchema);
