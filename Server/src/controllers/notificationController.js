const Notification = require('../models/Notification');
const Tenant = require('../models/Tenant');
const Admin = require('../models/User'); // Assuming Admin is a type of User
const nodemailer = require('nodemailer');

// Send a notification to a user or all tenants (email + DB)
exports.sendNotification = async (req, res) => {
    try {
        const { userId, title, message } = req.body;
        if (!title || !message) {
            return res.status(400).json({ error: 'title and message are required.' });
        }

        // Always use the admin's id from the token/session
        let sentBy = req.user && req.user._id ? req.user._id : null;
        if (!sentBy) {
            // fallback: get any admin
            const admin = await Admin.findOne();
            sentBy = admin ? admin._id : null;
        }

        let notifications = [];
        let emailResults = [];

        if (userId) {
            // Send to a single tenant
            const tenant = await Tenant.findById(userId);
            if (!tenant) {
                return res.status(404).json({ error: 'Tenant not found.' });
            }
            const notification = await Notification.create({
                title,
                message,
                recipient: tenant._id,
                sentBy,
            });
            notifications.push(notification);

            // Try to send email if tenant has email
            if (tenant.email) {
                try {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    });

                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: tenant.email,
                        subject: title,
                        text: message,
                    });
                    emailResults.push({ tenant: tenant._id, emailSent: true });
                } catch (emailErr) {
                    emailResults.push({ tenant: tenant._id, emailSent: false, error: emailErr.message });
                }
            } else {
                emailResults.push({ tenant: tenant._id, emailSent: false, error: 'No email on file.' });
            }
        } else {
            // Send to all tenants (announcement)
            const tenants = await Tenant.find();
            for (const tenant of tenants) {
                const notification = await Notification.create({
                    title,
                    message,
                    recipient: tenant._id,
                    sentBy,
                });
                notifications.push(notification);

                if (tenant.email) {
                    try {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS,
                            },
                        });

                        await transporter.sendMail({
                            from: process.env.EMAIL_USER,
                            to: tenant.email,
                            subject: title,
                            text: message,
                        });
                        emailResults.push({ tenant: tenant._id, emailSent: true });
                    } catch (emailErr) {
                        emailResults.push({ tenant: tenant._id, emailSent: false, error: emailErr.message });
                    }
                } else {
                    emailResults.push({ tenant: tenant._id, emailSent: false, error: 'No email on file.' });
                }
            }
        }

        res.status(201).json({
            notifications,
            emailResults,
            message: 'Notification(s) saved. Email sent where possible.',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all notifications for a user (by recipient)
exports.getMyNotifications = async (req, res) => {
    try {
        const userId = req.user._id; // Get from authenticated user
        const notifications = await Notification.find({ recipient: userId }).sort({ sentAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        if (!notificationId) {
            return res.status(400).json({ error: 'notificationId is required.' });
        }
        const updated = await Notification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};