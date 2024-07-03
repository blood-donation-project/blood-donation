const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600,
    },
});

const Token = mongoose.model('Token', TokenSchema);
Token.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = Token;
