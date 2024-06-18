const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    content: {

        text: { type: String, require: true },
        link: { type: String },
        image: { type: String },

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
