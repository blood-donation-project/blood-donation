const mongoose = require('mongoose');

const eventRegisSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
const EventRegistration = mongoose.model('EventRegistration', eventRegisSchema);

module.exports = EventRegistration;
