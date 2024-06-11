const { default: mongoose } = require('mongoose');
const Message = require('../models/message');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const messageController = {
    sendMessage: async (req, res) => {
        try {
            const { content } = req.body;
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            const token = authHeader.split(' ')[1];
            const senderId = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const receiverId = req.params.id;
            const newMessage = new Message({
                senderId: senderId.id,
                receiverId,
                content,
            });
            const messages = await newMessage.save();
            res.status(200).json(messages);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch events' });
        }
    },
    getMessage: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            const token = authHeader.split(' ')[1];
            const senderId = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const receiverId = req.params.id;
            const messages = await Message.find({
                $or: [
                    { senderId: senderId.id, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId.id },
                ],
            })
                .sort({ createAt: 1 })
                .populate({
                    path: 'receiverId senderId',
                    select: 'username avatar',
                })
                .lean()
                .exec();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch events' });
        }
    },
    getReceiver: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            const token = authHeader.split(' ')[1];
            const userId = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            const receiver = await Message.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                senderId: new mongoose.Types.ObjectId(
                                    userId.id
                                ),
                            },
                            {
                                receiverId: new mongoose.Types.ObjectId(
                                    userId.id
                                ),
                            },
                        ],
                    },
                },
                {
                    $sort: { createAt: -1 },
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                {
                                    $eq: [
                                        '$senderId',
                                        new mongoose.Types.ObjectId(userId.id),
                                    ],
                                },
                                '$receiverId',
                                '$senderId',
                            ],
                        },
                        latestMessage: { $first: '$$ROOT' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        latestMessage: 1,
                        user: { $arrayElemAt: ['$user', 0] }, // Sửa lỗi chính tả từ $arrayEleAt thành $arrayElemAt
                    },
                },
                {
                    $project: {
                        latestMessage: 1,
                        'user.username': 1,
                        'user.avatar': 1,
                    },
                },
                {
                    $sort: { 'latestMessage.createAt': -1 },
                },
            ]);

            res.status(200).json(receiver);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
};

module.exports = messageController;
