const Lease = require('../models/Lease');
const Unit = require('../models/Unit');
const User = require('../models/User');
const cron = require('node-cron');
// const { sendEmail } = require('../utils/emailService'); // Assuming you have an email service

// Create a lease
exports.createLease = async (req, res) => {
  try {
    const { tenantId, unitId, startDate, endDate, rentAmount } = req.body;

    const tenant = await User.findById(tenantId);
    if (!tenant || tenant.role !== 'tenant') {
      return res.status(404).json({ message: 'Tenant not found or invalid role' });
    }

    const unit = await Unit.findById(unitId);
    if (unit.isOccupied) {
      return res.status(400).json({ message: 'Unit Is occupied!!' });
    }
    if (!unit) {
      return res.status(400).json({ message: 'Unit Is Not Available!!' });
    }


    const lease = await Lease.create({
      tenant: tenantId,
      unit: unitId,
      startDate,
      endDate,
      rentAmount,
    });

    unit.isOccupied = true;
    await unit.save();

    res.status(201).json(lease);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create lease', error: error.message });
  }
};

// Get all leases (admin only)
exports.getAllLeases = async (req, res) => {
  try {
    const leases = await Lease.find().populate('tenant unit');
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leases', error: error.message });
  }
};

// Get lease by ID
exports.getLeaseById = async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id).populate('tenant unit');
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }
    res.json(lease);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lease', error: error.message });
  }
};

// Update lease (admin only)
exports.updateLease = async (req, res) => {
  try {
    const lease = await Lease.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tenant unit');
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }
    res.json(lease);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lease', error: error.message });
  }
};

// Delete lease (admin only)
exports.deleteLease = async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    const unit = await Unit.findById(lease.unit);
    if (unit) {
      unit.isOccupied = false;
      await unit.save();
    }

    await lease.remove();
    res.json({ message: 'Lease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lease', error: error.message });
  }
};



// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  const soon = new Date();
  // Set to the first day of next month for the first reminder
  const firstOfNextMonth = new Date(soon.getFullYear(), soon.getMonth() + 1, 1, 0, 0, 0, 0);

  // Set to the fifth day of the current month for the second reminder
  const fifthOfThisMonth = new Date(soon.getFullYear(), soon.getMonth(), 5, 0, 0, 0, 0);

  // Check if today is the 1st or 5th of the month
  if (soon.getDate() === 1) {
    // First of the month reminder
    const expiringLeases = await Lease.find({ leaseEndDate: { $lte: firstOfNextMonth } });
    // Send reminders (email, notification, etc.) for the 1st
  } else if (soon.getDate() === 5) {
    // Fifth of the month reminder
    // Find leases where rent is unpaid (you may need to adjust this based on your schema)
    { rentPaid: false }
    // You can add more logic if you track due dates, etc.});
    // Send reminders (email, notification, etc.) for the 5th
  }
  const expiringLeases = await Lease.find({ leaseEndDate: { $lte: soon } });
  // Send reminders (email, notification, etc.)
});