const User = require('../models/user');
const Friends = require('../models/friends');
const FriendRequest = require('../models/friendRequests');
const Posts = require('../models/posts');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createPagination = require('../utils/pagination/createPagination');

const userController = {
    getUser: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const user = await User.findById(decodedToken.id).select('-password');
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

    getPhotos: async (req, res) => {
        try {
            const userId = req.params.id;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            const dbUser = await User.findById(userId).select('-password');
            if (!dbUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const totalImages = await Posts.countDocuments({
                userId: userId,
                image: { $ne: null, $ne: '' },
            });
            const pagination = createPagination(limit, page, totalImages);

            const posts = await Posts.find({
                userId: userId,
                image: { $ne: null, $ne: '' },
            })
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const imageUrls = posts.map((post) => post.image);

            const links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/user/photos?imit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/user/photos?imit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            res.status(200).json({
                data: imageUrls,
                pagination: {
                    ...pagination,
                    links,
                },
            });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            }
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const myId = req.user.id;

            if (!userId) return res.status(400), json({ error: 'Invalid user id' });
            const dbUser = await User.findById(userId).select('-password');
            if (!dbUser) return res.status(404).json({ error: 'User not found' });

            const isFriend = await Friends.findOne({
                $or: [
                    { userId1: userId, userId2: myId },
                    { userId1: myId, userId2: userId },
                ],
            });

            const friendRequest = await FriendRequest.findOne({
                $or: [
                    { senderId: userId, receiverId: myId },
                    { senderId: myId, receiverId: userId },
                ],
                status: 'pending',
            });

            if (dbUser.role === 'Cơ sở y tế') {
                return res.status(200).json({
                    ...dbUser._doc,
                    isFriend: false,
                    isFollowed: isFriend ? true : false,
                    friendRequest: {},
                });
            }

            return res.status(200).json({
                ...dbUser._doc,
                isFriend: isFriend ? true : false,
                isFollowed: false,
                friendRequest,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    lockorUnLockUser: async (req, res) => {
        try {
            const { userId } = req.body;
            console.log(req.body);
            const user = await User.findById(userId);
            if (user.block) {
                await User.findByIdAndUpdate(userId, { block: false });
                return res
                    .status(200)
                    .json({ message: 'UnLock successfully!' });
            } else {
                await User.findByIdAndUpdate(userId, { block: true });
                return res.status(200).json({ message: 'Lock successfully!' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const { searchTerm, role, block } = req.body;
            console.log(req.body);
            let query = {
                role: { $ne: 'admin' },
            };
            if (searchTerm) {
                const isObjectId = mongoose.Types.ObjectId.isValid(searchTerm);
                if (isObjectId) {
                    query._id = searchTerm;
                } else {
                    query.username = { $regex: searchTerm, $options: 'i' };
                }
            }
            if (role) {
                if (Array.isArray(role) && role.length > 0) {
                    // Kiểm tra mảng có rỗng không
                    query.role = { $in: role };
                } else if (typeof role === 'string') {
                    query.role = { $regex: role, $options: 'i' };
                }
            }
            if (block) {
                query.block = block;
            }
            const users = await User.find(query);
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
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
