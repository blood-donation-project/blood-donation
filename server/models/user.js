const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
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
        default: 'https://res.cloudinary.com/dkjwdmndq/image/upload/v1717860215/news_images/yelzul3f8fofpghnwmig.jpg',
    },
    backgroundImage: {
        type: String,
    },
    introduce: {
        type: String,
    },
    identification: {
        type: String,
        default: '',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    block: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.index({ username: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;
