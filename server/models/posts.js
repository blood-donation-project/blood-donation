const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        image: {
            type: String,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
