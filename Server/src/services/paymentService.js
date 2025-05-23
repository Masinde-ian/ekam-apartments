// src/services/paymentService.js
const Payment = require('../models/Payment');

const recordPayment = async (leaseId, amount) => {
  return await Payment.create({ leaseId, amount });
};

module.exports = { recordPayment };