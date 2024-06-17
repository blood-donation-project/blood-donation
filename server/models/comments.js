const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
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
    content: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
