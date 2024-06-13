const socketIO = require('socket.io');
const Message = require('../models/message');
const mongoose = require('mongoose');
const User = require('../models/user');

const onlineUsers = new Set();
const offlineTimes = new Map();

const messageSocket = (server, corsOptions) => {
    const io = socketIO(server, {
        cors: corsOptions,
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
            onlineUsers.delete(socket.userId);
            offlineTimes.set(socket.userId, new Date());
            io.emit('updateUserStatus', Array.from(onlineUsers));
        });

        socket.on('register', (userId) => {
            console.log(`Register event received for user ${userId}`);
            socket.userId = userId;
            socket.join(userId); // Join user
            onlineUsers.add(userId);
            console.log(`User ${userId} registered and joined room ${userId}`);

            // if user offline before,
            if (offlineTimes.has(userId)) {
                const lastOfflineTime = offlineTimes.get(userId);
                const offlineDuration = new Date() - lastOfflineTime;
                console.log(
                    `Sending offline duration for user ${userId}: ${offlineDuration} ms`
                );
                io.to(userId).emit('offlineDuration', {
                    userId,
                    offlineDuration,
                });
                offlineTimes.delete(userId);
            }

            io.emit('updateUserStatus', Array.from(onlineUsers));
        });

        socket.on('privateMessage', async ({ receiverId, content }) => {
            const senderId = socket.userId;

            const message = new Message({
                senderId: senderId,
                receiverId: receiverId,
                content,
            });
            await message.save();

            const sender = await User.findById(senderId);
            const receiver = await User.findById(receiverId);

            console.log(
                `User ${senderId} sent a private message to User ${receiverId}: ${content}`
            );

            // Setting send message
            const roomId = [senderId, receiverId].sort().join('_');
            io.to(roomId).emit('privateMessage', {
                senderId: {
                    _id: sender._id,
                    username: sender.username,
                    avatar: sender.avatar,
                },
                receiverId: {
                    _id: receiver._id,
                    username: receiver.username,
                    avatar: receiver.avatar,
                },
                content,
                _id: message._id,
                createAt: message.createAt,
            });

            // Fetch latest conversations for sender
            const latestConversationsSender = await Message.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                senderId: new mongoose.Types.ObjectId(
                                    sender._id
                                ),
                            },
                            {
                                receiverId: new mongoose.Types.ObjectId(
                                    sender._id
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
                                        new mongoose.Types.ObjectId(sender._id),
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
                        user: { $arrayElemAt: ['$user', 0] },
                    },
                },
                {
                    $project: {
                        latestMessage: 1,
                        'user.username': 1,
                        'user.avatar': 1,
                        'user._id': 1,
                    },
                },
                {
                    $sort: { 'latestMessage.createAt': -1 },
                },
            ]);

            // Fetch latest conversations for receiver
            const latestConversationsReceiver = await Message.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                senderId: new mongoose.Types.ObjectId(
                                    receiver._id
                                ),
                            },
                            {
                                receiverId: new mongoose.Types.ObjectId(
                                    receiver._id
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
                                        new mongoose.Types.ObjectId(
                                            receiver._id
                                        ),
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
                        user: { $arrayElemAt: ['$user', 0] },
                    },
                },
                {
                    $project: {
                        latestMessage: 1,
                        'user.username': 1,
                        'user.avatar': 1,
                        'user._id': 1,
                    },
                },
                {
                    $sort: { 'latestMessage.createAt': -1 },
                },
            ]);

            // Emit newMessage event with latest conversations to sender and receiver
            io.to(sender._id.toString()).emit(
                'newMessage',
                latestConversationsSender
            );
            io.to(receiver._id.toString()).emit(
                'newMessage',
                latestConversationsReceiver
            );
        });

        socket.on('joinRoom', (receiverId) => {
            const senderId = socket.userId;
            const roomId = [senderId, receiverId].sort().join('_');
            socket.join(roomId);
            console.log(`User ${socket.userId} joined room ${roomId}`);
        });
    });
};

module.exports = messageSocket;
