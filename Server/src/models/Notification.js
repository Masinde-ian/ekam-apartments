const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User is the model for admins
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);