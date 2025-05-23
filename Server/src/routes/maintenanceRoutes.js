const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { protect, adminOnly, authorize } = require('../middleware/authMiddleware');

// Create a new maintenance request (accessible to tenants)
router.post(
  '/',
  protect,
  authorize('tenant', 'admin'),
  maintenanceController.createRequest
);

// Get all maintenance requests (admin only)
router.get(
  '/',
  protect,
  authorize('admin'),
  maintenanceController.getAllRequests
);

// Get a single maintenance request by ID (admin or owner of request)
router.get(
  '/:id',
  protect,
  authorize('admin', 'tenant'),
  maintenanceController.getRequestById
);

// Update maintenance request (admin only)
router.put(
  '/:id',
  protect,
  authorize('admin'),
  maintenanceController.updateRequest
);

// Delete a maintenance request (admin and tenant who created it)
router.delete(
  '/:id',
  protect,
  authorize('admin', 'tenant'),
  maintenanceController.deleteRequest
);

module.exports = router;
