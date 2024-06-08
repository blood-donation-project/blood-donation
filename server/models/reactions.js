const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Reactions = mongoose.model('Reactions', reactionSchema);

module.exports = Reactions;
