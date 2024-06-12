const socketIO = require('socket.io');
const Message = require('../models/message');

const messageSocket = (server, corsOptions) => {
    const io = socketIO(server, {
        cors: corsOptions,
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('register', (userId) => {
            socket.userId = userId;
            console.log(`User ${userId} registered`);
        });

        socket.on('privateMessage', async ({ receiverId, content }) => {
            const senderId = socket.userId;

            const message = new Message({
                senderId: senderId,
                receiverId: receiverId,
                content,
            });
            await message.save();

            console.log(
                `User ${senderId} sent a private message to User ${receiverId}: ${content}`
            );

            // Setting send message
            const roomId = [senderId, receiverId].sort().join('_');
            io.to(roomId).emit('privateMessage', {
                senderId: { _id: senderId },
                content,
                _id: message._id,
            });
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
