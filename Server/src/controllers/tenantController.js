const Tenant = require('../models/User'); // Assuming tenants are stored in the User model
const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Admin
const getTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find({ role: 'tenant' }).select('-password');
  res.status(200).json(tenants);
});

// @desc    Get tenant by ID
// @route   GET /api/tenants/:id
// @access  Admin or the tenant themselves
const getTenantById = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id).select('-password');

  if (!tenant || tenant.role !== 'tenant') {
    res.status(404);
    throw new Error('Tenant not found');
  }

  res.status(200).json(tenant);
});

// @desc    Create a new tenant
// @route   POST /api/tenants
// @access  Admin
const createTenant = asyncHandler(async (req, res) => {
  const { name, email, phone, password, unitId } = req.body;

  const existing = await Tenant.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Tenant with this email already exists');
  }

  const unit = await Unit.findById(unitId);
  if (!unit || !unit.available) {
    res.status(400);
    throw new Error('Unit not available or not found');
  }

  const tenant = new Tenant({
    name,
    email,
    phone,
    password,
    role: 'tenant',
    unitId,
  });

  const createdTenant = await tenant.save();

  unit.available = false;
  await unit.save();

  res.status(201).json({
    _id: createdTenant._id,
    name: createdTenant.name,
    email: createdTenant.email,
    phone: createdTenant.phone,
    unitId: createdTenant.unitId,
  });
});

// @desc    Update tenant info
// @route   PUT /api/tenants/:id
// @access  Admin or the tenant themselves
const updateTenant = asyncHandler(async (req, res) => {
  const { name, phone, unitId } = req.body;

  const tenant = await Tenant.findById(req.params.id);
  if (!tenant || tenant.role !== 'tenant') {
    res.status(404);
    throw new Error('Tenant not found');
  }

  if (unitId && unitId !== tenant.unitId?.toString()) {
    const newUnit = await Unit.findById(unitId);
    if (!newUnit || !newUnit.available) {
      res.status(400);
      throw new Error('New unit not available');
    }

    const oldUnit = await Unit.findById(tenant.unitId);
    if (oldUnit) {
      oldUnit.available = true;
      await oldUnit.save();
    }

    newUnit.available = false;
    await newUnit.save();

    tenant.unitId = unitId;
  }

  tenant.name = name || tenant.name;
  tenant.phone = phone || tenant.phone;

  const updatedTenant = await tenant.save();

  res.status(200).json(updatedTenant);
});

// @desc    Delete tenant
// @route   DELETE /api/tenants/:id
// @access  Admin
const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant || tenant.role !== 'tenant') {
    res.status(404);
    throw new Error('Tenant not found');
  }

  const unit = await Unit.findById(tenant.unitId);
  if (unit) {
    unit.available = true;
    await unit.save();
  }

  await tenant.remove();
  res.status(200).json({ message: 'Tenant deleted successfully' });
});

module.exports = {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
};
