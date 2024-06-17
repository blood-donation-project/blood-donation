const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    receivedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    content: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
