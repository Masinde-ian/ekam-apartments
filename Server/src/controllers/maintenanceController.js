const MaintenanceRequest = require('../models/MaintenanceRequest');

// Create a new maintenance request
const createRequest = async (req, res, next) => {
  try {
    const request = await MaintenanceRequest.create(req.body);
    res.status(201).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

// Get all maintenance requests
const getAllRequests = async (req, res, next) => {
  try {
    const requests = await MaintenanceRequest.find().populate('unit tenant');
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    next(err);
  }
};

// Get single request by ID
const getRequestById = async (req, res, next) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id).populate('unit tenant');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

// Update request status
const updateRequest = async (req, res, next) => {
  try {
    const updated = await MaintenanceRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete a request
const deleteRequest = async (req, res, next) => {
  try {
    const removed = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, message: 'Request deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
