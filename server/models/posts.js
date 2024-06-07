const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            require: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);
