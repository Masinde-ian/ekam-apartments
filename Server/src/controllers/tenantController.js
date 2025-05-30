const Tenant = require('../models/Tenant');
const Unit = require('../models/Unit');
const User = require('../models/User'); // Make sure this path is correct
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); // <-- Add bcrypt for password hashing

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Admin
const getTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find().populate('unit');
  res.status(200).json(tenants);
});

// @desc    Get tenant by ID
// @route   GET /api/tenants/:id
// @access  Admin or the tenant themselves
const getTenantById = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id).populate('unit');
  if (!tenant) {
    res.status(404);
    throw new Error('Tenant not found');
  }
  res.status(200).json(tenant);
});

// @desc    Create a new tenant
// @route   POST /api/tenants
// @access  Admin
const createTenant = asyncHandler(async (req, res) => {
  const { fullName, contactNumber, email, leaseStart, leaseEnd, unit } = req.body;

  // Check for existing tenant by email
  const existing = await Tenant.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Tenant with this email already exists');
  }

  // Check if unit exists and is available
  const foundUnit = await Unit.findById(unit);
  if (!foundUnit || foundUnit.status !== 'available') {
    res.status(400);
    throw new Error('Unit not available or not found');
  }

  // Create tenant
  const tenant = new Tenant({
    fullName,
    contactNumber,
    email,
    leaseStart,
    leaseEnd,
    unit,
    status: 'active',
  });

  const createdTenant = await tenant.save();

  // Mark unit as occupied
  foundUnit.status = 'occupied';
  await foundUnit.save();

  // Hash the default password before saving the user
  const defaultPassword = '12345678';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(defaultPassword, salt);

  // Add tenant to User model as well
  const user = new User({
    name: fullName,
    email,
    password: hashedPassword, // Store hashed password
    phone: contactNumber,
    role: 'tenant',
    tenant: createdTenant._id, // reference to tenant
  });
  await user.save();

  res.status(201).json(createdTenant);
});

// @desc    Update tenant info
// @route   PUT /api/tenants/:id
// @access  Admin or the tenant themselves
const updateTenant = asyncHandler(async (req, res) => {
  const { fullName, contactNumber, leaseStart, leaseEnd, unit } = req.body;

  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(404);
    throw new Error('Tenant not found');
  }

  // If unit is being changed, update unit statuses
  if (unit && unit !== tenant.unit?.toString()) {
    const newUnit = await Unit.findById(unit);
    if (!newUnit || newUnit.status !== 'available') {
      res.status(400);
      throw new Error('New unit not available');
    }
    const oldUnit = await Unit.findById(tenant.unit);
    if (oldUnit) {
      oldUnit.status = 'available';
      await oldUnit.save();
    }
    newUnit.status = 'occupied';
    await newUnit.save();
    tenant.unit = unit;
  }

  tenant.fullName = fullName || tenant.fullName;
  tenant.contactNumber = contactNumber || tenant.contactNumber;
  tenant.leaseStart = leaseStart || tenant.leaseStart;
  tenant.leaseEnd = leaseEnd || tenant.leaseEnd;

  const updatedTenant = await tenant.save();

  // Optionally update User model as well
  await User.findOneAndUpdate(
    { tenant: tenant._id },
    {
      name: tenant.fullName,
      email: tenant.email,
      phone: tenant.contactNumber,
    }
  );

  res.status(200).json(updatedTenant);
});

// @desc    Delete tenant
// @route   DELETE /api/tenants/:id
// @access  Admin
const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(404);
    throw new Error('Tenant not found');
  }

  // Set unit as available
  const unit = await Unit.findById(tenant.unit);
  if (unit) {
    unit.status = 'available';
    await unit.save();
  }

  // Remove from User model as well
  await User.findOneAndDelete({ tenant: tenant._id });

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