const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId1: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Friends = mongoose.model('Friends', friendSchema);

module.exports = Friends;
