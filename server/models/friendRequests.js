const mongoose = require('mongoose');

const friendRequest = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const FriendRequest = mongoose.model('FriendRequest', friendRequest);

module.exports = FriendRequest;
