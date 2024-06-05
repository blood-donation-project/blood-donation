const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userController = {
    getUser: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const user = await User.findById(decodedToken.id).select(
                '-password'
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            }
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = userController;
