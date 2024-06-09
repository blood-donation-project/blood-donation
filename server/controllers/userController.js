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
    updateUser: async (req, res) => {
        try {
            const {
                username,
                identification,
                avatar,
                backgroundImage,
                street,
                province,
                district,
                ward,
                phoneNumber,
                bloodGroup,
                role,
            } = req.body;
            const address = {
                province,
                district,
                ward,
                street,
            };
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const user = await User.findById(decodedToken.id).select(
                '-password'
            );
            console.log(user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const checkIdentification = await User.findOne({
                identification: identification,
                _id: { $ne: user.id }, // Loại trừ chính người dùng đang cập nhật
            });
            console.log('Identi', req.body);
            const checkPhoneNumber = await User.findOne({
                phoneNumber: phoneNumber,
                _id: { $ne: user.id }, // Loại trừ chính người dùng đang cập nhật
            });

            if (checkIdentification) {
                return res
                    .status(409)
                    .json({ message: 'Identification exist' });
            }

            if (checkPhoneNumber) {
                return res.status(409).json({ message: 'PhoneNumber exist' });
            }
            console.log(checkPhoneNumber);

            const result = await User.updateOne(
                { _id: user.id },
                {
                    username,
                    identification,
                    avatar,
                    backgroundImage,
                    phoneNumber,
                    address,
                    bloodGroup,
                    role,
                }
            );
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi cập nhật người dùng' });
        }
    },
};

module.exports = userController;
