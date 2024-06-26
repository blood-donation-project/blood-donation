import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const register = (userId) => {
    console.log('Registering user: ', userId);
    socket.emit('register', userId);
};

const sendMessage = (receiverId, content) => {
    socket.emit('privateMessage', { receiverId, content });
    console.log('Sent message to:', receiverId);
    console.log('Message content:', content);
};

const onMessageReceived = (callback) => {
    socket.on('privateMessage', callback);
};

const offMessageReceived = (callback) => {
    socket.off('privateMessage', callback);
};

const joinConversationRoom = (receivedId) => {
    socket.emit('joinRoom', receivedId);
};

const onNewMessage = (callback) => {
    socket.on('newMessage', callback);
};

const offNewMessage = () => {
    socket.off('newMessage');
};

const onUpdateUserStatus = (callback) => {
    socket.on('updateUserStatus', callback);
};

const offUpdateUserStatus = (callback) => {
    socket.off('updateUserStatus', callback);
};

export {
    register,
    sendMessage,
    onMessageReceived,
    offMessageReceived,
    joinConversationRoom,
    onNewMessage,
    offNewMessage,
    onUpdateUserStatus,
    offUpdateUserStatus,
};
