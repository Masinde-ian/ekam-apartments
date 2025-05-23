const express = require('express');
const router = express.Router();
const leaseController = require('../controllers/leaseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create a new lease
router.post('/', protect, adminOnly, leaseController.createLease);

// Get all leases
router.get('/', protect, adminOnly, leaseController.getAllLeases);

// Get lease by ID
router.get('/:id', protect, adminOnly, leaseController.getLeaseById);

// Update lease by ID
router.put('/:id', protect, adminOnly, leaseController.updateLease);

// Delete lease by ID
router.delete('/:id', protect, adminOnly, leaseController.deleteLease);

module.exports = router;
