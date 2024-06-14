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
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (identification && identification.trim() !== '') {
                const checkIdentification = await User.findOne({
                    identification: identification,
                    _id: { $ne: user.id }, // Loại trừ chính người dùng đang cập nhật
                });
                if (checkIdentification) {
                    return res
                        .status(409)
                        .json({ message: 'Identification exist' });
                }
            }
            if (phoneNumber && phoneNumber.trim() !== '') {
                const checkPhoneNumber = await User.findOne({
                    phoneNumber: phoneNumber,
                    _id: { $ne: user.id }, // Loại trừ chính người dùng đang cập nhật
                });
                if (checkPhoneNumber) {
                    return res
                        .status(409)
                        .json({ message: 'PhoneNumber exist' });
                }
            }

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
    //Get user by iD
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const [userById, currentUser] = await Promise.all([
                User.findById(userId).select('-password').lean(),
                User.findById(decodedToken.id).lean(),
            ]);
            if (!userById) {
                return res.status(404).json({ message: 'User not found' });
            }

            const check =
                userById._id.toString() === currentUser._id.toString()
                    ? 'owner'
                    : 'not owner';
            const { ...userData } = userById;
            return res.status(200).json({ check, user: userData });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get UserByMonth
    getUserByMonths: async (req, res) => {
        try {
            const allMonths = Array.from({ length: 12 }, (_, i) =>
                new Date(0, i).toLocaleString('en-US', { month: 'long' })
            );
            const currentYear = new Date().getFullYear();

            const result = await User.aggregate([
                {
                    $match: {
                        createAt: {
                            $gte: new Date(`${currentYear}-01-01`),
                            $lt: new Date(`${currentYear + 1}-01-01`),
                        },
                    },
                },
                {
                    $facet: {
                        usersByMonth: [
                            {
                                $group: {
                                    _id: { $month: '$createAt' },
                                    count: { $sum: 1 },
                                },
                            },
                            { $sort: { _id: 1 } },
                        ],
                        totalUsers: [{ $count: 'count' }],
                        totalRoles: [
                            { $group: { _id: '$role', count: { $sum: 1 } } },
                        ],
                    },
                },
            ]);

            const usersByMonth = fillMissingMonths(
                result[0].usersByMonth,
                allMonths
            );
            const totalUsers = result[0].totalUsers[0]?.count || 0;
            const totalRoles = result[0].totalRoles; 

            res.status(200).json({
                usersByMonth,
                totalUsers,
                totalRoles,
            });
        } catch (error) {
            console.error('Error in getUserByMonths:', error); 
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

function fillMissingMonths(data, allMonths) {
    const monthCountMap = new Map(data.map((item) => [item._id, item.count]));
    return allMonths.map((month) => ({
        month,
        count: monthCountMap.get(allMonths.indexOf(month) + 1) || 0,
    }));
}

module.exports = userController;
