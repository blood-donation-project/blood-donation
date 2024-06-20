const jwt = require('jsonwebtoken');
const Notification = require('../models/notifications');
const User = require('../models/user');
const { sendEmailRequestHelp } = require('../utils/sendEmail');

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
    getNotificationByType: async (req, res) => {
        try {
            const { type } = req.body;
            let query = {};
            if (type) {
                query.type = { $regex: type, $options: 'i' };
            }
            const result = await Notification.find(query);
            res.status(200).json(result);
            console.log(type);
            console.log(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    notifiHelp: async (req, res) => {
        try {
            const { helperId } = req.body;
            console.log(req.body);
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization header missing' });
            }
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const inforUser = await User.findById(user.id);
            const inforHelper = await User.findById(helperId);
            const newNotification = new Notification({
                userId: helperId,
                content: {
                    text: `<p><strong>${inforUser.username}</strong> đang cần sự giúp đỡ của bạn hãy giúp ${
                        inforUser.gender === 'Nam' ? 'anh ấy' : 'cô ấy'
                    }! </p>`,
                    link: `/user/${user.id}`,
                    image: inforUser.avatar,
                },
                type: `Help_${helperId}_${user.id}`,
            });
            await newNotification.save();

            const url = `http://localhost:3000/user/${inforHelper._id}`;
            await sendEmailRequestHelp(
                inforHelper.email,
                inforUser.email,
                inforUser.phoneNumber,
                inforUser.username,
                inforHelper.username,
                url,
            );

            res.status(200).json({ message: 'Successfully' });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = notificationController;
