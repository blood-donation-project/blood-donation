const jwt = require('jsonwebtoken');
const Notification = require('../models/notifications');

const notificationController = {
    getAllNotifi: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await Notification.find({ userId: userId });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = notificationController;
