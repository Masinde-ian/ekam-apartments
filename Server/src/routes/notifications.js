const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');
const Notification = require('../models/Notification');

// GET /api/notifications/my - Get notifications for the logged-in tenant
router.get('/my', protect, notificationController.getMyNotifications);

// POST /api/notifications - Admin posts an announcement/notification
router.post('/', protect, notificationController.sendNotification);

// GET /api/notifications/announcements - Get all announcements
router.get('/announcements', async (req, res) => {
  try {
    // Only fetch notifications that are announcements (sent to all tenants)
    // If you don't have an 'isAnnouncement' flag, fetch all notifications for now
    const announcements = await Notification.find()
      .populate('sentBy', 'name email') // Make sure 'sentBy' ref matches your model
      .sort({ sentAt: -1 });
    res.json({ data: announcements });
  } catch (err) {
    console.error(err); // <-- Add this to see the real error in your server logs
    res.status(500).json({ message: 'Failed to fetch announcements.' });
  }
});

module.exports = router;