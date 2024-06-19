const jwt = require('jsonwebtoken');
const Notification = require('../models/notifications');

const notificationController = {
    getAllNotifi: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await Notification.find({ userId: userId }).sort({ createAt: -1 });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getNotificationEvent: async (req, res) => {
        try {
            const { type } = req.body;
            let query = {};
            if (type) {
                query.type = { $regex: type, $options: 'i' };
            }
            const result = await Notification.find(query);
            res.status(200).json(result);
            console.log(type);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = notificationController;
