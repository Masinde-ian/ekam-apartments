// src/controllers/unitController.js
const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');

// @desc    Get all units
// @route   GET /api/units
// @access  Public or Authenticated
const getUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find();
  res.status(200).json(units);
});

// @desc    Get single unit by ID
// @route   GET /api/units/:id
// @access  Public or Authenticated
const getUnitById = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    res.status(404);
    throw new Error('Unit not found');
  }
  res.status(200).json(unit);
});

// @desc    Create a new unit
// @route   POST /api/units
// @access  Admin
const createUnit = asyncHandler(async (req, res) => {
  const { id, houseType, houseNumber, rent, status } = req.body;

  const unit = new Unit({
    id,
    houseType,
    houseNumber,
    rent,
    status,
  });

  const createdUnit = await unit.save();
  res.status(201).json(createdUnit);
});

// @desc    Update a unit
// @route   PUT /api/units/:id
// @access  Admin
const updateUnit = asyncHandler(async (req, res) => {
  const { id, houseType, houseNumber, rent, status } = req.body;

  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    res.status(404);
    throw new Error('Unit not found');
  }

  unit.id = id || unit.id;
  unit.houseType = houseType || unit.houseType;
  unit.houseNumber = houseNumber || unit.houseNumber;
  unit.rent = rent || unit.rent;
  unit.status = status !== undefined ? status : unit.status;

  const updatedUnit = await unit.save();
  res.status(200).json(updatedUnit);
});

// @desc    Delete a unit
// @route   DELETE /api/units/:id
// @access  Admin
const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    res.status(404);
    throw new Error('Unit not found');
  }

  await unit.remove();
  res.status(200).json({ message: 'Unit removed successfully' });
});

module.exports = {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
};
