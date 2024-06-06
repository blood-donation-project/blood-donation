const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, require: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Tên model User
    },
    medicalName: { type: String, require: true },
    image: { type: String },
    address: {
        province: {
            type: String,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        ward: {
            type: String,
            require: true,
        },
        street: {
            type: String,
            require: true,
        },
    },
    description: { type: String },
    donationTime: {
        type: String,
        require: true,
    },
    timeStart: {
        type: String,
        require: true,
    },
    timeEnd: {
        type: String,
        require: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
