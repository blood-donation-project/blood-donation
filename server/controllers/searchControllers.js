const Posts = require('../models/posts');
const User = require('../models/user');
const Friends = require('../models/friends');
const Reactions = require('../models/reactions');
const Comments = require('../models/comments');
const dotenv = require('dotenv');
dotenv.config();

const createPagination = require('../utils/pagination/createPagination');
const FriendRequest = require('../models/friendRequests');

const searchControllers = {
    searchUsers: async (req, res) => {
        try {
            const userId = req.user.id;
            const q = req.query.q;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            const totalUsers = await User.countDocuments({
                _id: { $ne: userId },
                $text: { $search: q },
            });
            const pagination = createPagination(limit, page, totalUsers);

            const dbUsers = await User.find({
                _id: { $ne: userId },
                $text: { $search: q },
            })
                .select('-password')
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedResults = await Promise.all(
                dbUsers.map(async (user) => {
                    const isFriend = friendIds.includes(user._id.toString());
                    const friendRequest = await FriendRequest.findOne({
                        $or: [
                            { senderId: userId, receiverId: user._id },
                            { senderId: user._id, receiverId: userId },
                        ],
                        status: 'pending',
                    });

                    return {
                        ...user._doc,
                        isFriend,
                        friendRequest,
                    };
                }),
            );

            const links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/search/users?q=${q}limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/search/users?q=${q}limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedResults,
                pagination: {
                    ...pagination,
                    links,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    searchPosts: async (req, res) => {
        try {
            const userId = req.user.id;
            const q = req.query.q;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            const totalPosts = await Posts.countDocuments({
                $text: { $search: q },
            });
            const pagination = createPagination(limit, page, totalPosts);

            const dbPosts = await Posts.find({
                $text: { $search: q },
            })
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedResults = await Promise.all(
                dbPosts.map(async (post) => {
                    const commentCount = await Comments.countDocuments({ postId: post._id });
                    const likeCount = await Reactions.countDocuments({ postId: post._id });
                    const liked = await Reactions.exists({ postId: post._id, userId });
                    const isFriend = friendIds.includes(post.userId.toString());
                    const author = await User.findById(post.userId).select('-password');
                    const friendRequest = await FriendRequest.findOne({
                        $or: [
                            { senderId: userId, receiverId: post.userId },
                            { senderId: post.userId, receiverId: userId },
                        ],
                        status: 'pending',
                    });
                    return {
                        ...post._doc,
                        commentCount,
                        likeCount,
                        liked: liked ? true : false,
                        author: {
                            ...author._doc,
                            isFriend,
                            friendRequest,
                        },
                    };
                }),
            );

            const links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/search/posts?q=${q}limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/search/posts?q=${q}limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedResults,
                pagination: {
                    ...pagination,
                    links,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    surroundingUsers: async (req, res) => {
        try {
            const userId = req.user.id;
            const dbUser = await User.findById(userId);

            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;
            const province = req.query.province ? req.query.province : dbUser.address.province;
            const bloodGroup = req.query.bloodGroup ? req.query.bloodGroup : null;
            console.log({
                province,
                bloodGroup,
            });
            const query = {
                'address.province': province,
                status: true,
            };

            if (bloodGroup) {
                query.bloodGroup = decodeURIComponent(bloodGroup);
            }

            //
            const totalUsers = await User.countDocuments(query);
            const pagination = createPagination(limit, page, totalUsers);

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            //
            const dbUsers = await User.find({
                ...query,
                _id: { $ne: userId, $nin: [...friendIds] },
            })
                .select('-password')
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const formattedResults = await Promise.all(
                dbUsers.map(async (user) => {
                    const friendRequest = await FriendRequest.findOne({
                        $or: [
                            { senderId: userId, receiverId: user._id },
                            { senderId: user.userId, receiverId: userId },
                        ],
                        status: 'pending',
                    });
                    return {
                        ...user._doc,
                        isFriend: false,
                        friendRequest,
                    };
                }),
            );

            const links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/search/surrounding-users?province=${province}&${
                    bloodGroup ? 'blood=' + bloodGroup + '&' : ''
                }limit=${pagination.perPage}&page=${pagination.currentPage + 1}`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/search/surrounding-users?province=${province}&${
                    bloodGroup ? 'blood=' + bloodGroup + '&' : ''
                }limit=${pagination.perPage}&page=${pagination.currentPage - 1}`;
            }

            return res.status(200).json({
                data: formattedResults,
                pagination: {
                    ...pagination,
                    links,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
};

module.exports = searchControllers;
