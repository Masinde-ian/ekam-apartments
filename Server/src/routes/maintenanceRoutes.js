const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// Create a new maintenance request
router.post('/', maintenanceController.createRequest);

// Get all maintenance requests
router.get('/', maintenanceController.getAllRequests);

// Get a single maintenance request by ID
router.get('/:id', maintenanceController.getRequestById);

// Update maintenance request
router.put('/:id', maintenanceController.updateRequest);

// Delete a maintenance request
router.delete('/:id', maintenanceController.deleteRequest);

module.exports = router;