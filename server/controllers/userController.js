const User = require('../models/user');
const Friends = require('../models/friends');
const FriendRequest = require('../models/friendRequests');
const Posts = require('../models/posts');
const jwt = require('jsonwebtoken');

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
};

module.exports = userController;
