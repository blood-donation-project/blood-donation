const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            province: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            ward: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
        },
        phoneNumber: {
            type: String,
            unique: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            required: true,
            default: 'Người hiến máu',
        },
        bloodGroup: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
