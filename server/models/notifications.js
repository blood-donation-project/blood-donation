const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    type: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notifications', notificationSchema);

module.exports = Notification;
