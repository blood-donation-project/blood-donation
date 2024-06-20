const User = require('../models/user');
const Friends = require('../models/friends');
const FriendRequest = require('../models/friendRequests');
const Notification = require('../models/notifications');
const mongoose = require('mongoose');

const createPagination = require('../utils/pagination/createPagination');
const { link } = require('../routes/friend');

const friendControllers = {
    getSuggestedUsers: async (req, res) => {
        try {
            const userId = req.user.id;
            const limit = req.query.limit ? Number(req.query.limit) : 15;
            const page = req.query.page ? Number(req.query.page) : 1;

            const currentUser = await User.findById(userId);

            // Get friends id
            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId.toString() ? friend.userId2 : friend.userId1,
            );

            // Get friends request id
            const friendRequests = await FriendRequest.find({
                $or: [{ senderId: userId }, { receiverId: userId }],
                status: { $nin: ['rejected'] },
            });

            const requestUserIds = friendRequests.map((request) =>
                request.senderId.toString() === userId.toString() ? request.receiverId : request.senderId,
            );

            //Create pagination
            const totalSuggested = await User.countDocuments({
                _id: { $ne: userId, $nin: [...friendIds, ...requestUserIds] },
                'address.province': currentUser.address.province,
            });
            const pagination = createPagination(limit, page, totalSuggested);
            //Get suggested users by province
            const suggestedUsers = await User.find({
                _id: { $ne: userId, $nin: [...friendIds, ...requestUserIds] },
                'address.province': currentUser.address.province,
            })
                .select('-password')
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            //
            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/user/suggested?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/user/suggested?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            res.status(200).json({
                data: suggestedUsers,
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
    getAllFriends: async (req, res) => {
        try {
            const userId = req.query.userId;
            const limit = req.query.limit ? Number(req.query.limit) : 15;
            const page = req.query.page ? Number(req.query.page) : 1;

            // Case user not found
            const currentUser = await User.findById(userId);
            if (!currentUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create pagination

            // Get friends id
            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId.toString() ? friend.userId2 : friend.userId1,
            );

            const totalFriends = await User.countDocuments({
                _id: { $in: friendIds },
                role: { $ne: 'Cơ sở y tế' },
            });
            const pagination = createPagination(limit, page, totalFriends);

            // Get all friend data
            const dbFriendsData = await User.find({
                _id: { $in: friendIds },
                role: { $ne: 'Cơ sở y tế' },
            })
                .select('-password')
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const formatedFriends = dbFriendsData.map((friend) => {
                return {
                    ...friend._doc,
                    isFriend: true,
                };
            });

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/user/friends?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/user/friends?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            res.status(200).json({
                data: formatedFriends,
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
    getAllFollowedFacilities: async (req, res) => {
        try {
            const userId = req.user.id;
            const limit = req.query.limit ? Number(req.query.limit) : 15;
            const page = req.query.page ? Number(req.query.page) : 1;

            const currentUser = await User.findById(userId);
            if (!currentUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId.toString() ? friend.userId2 : friend.userId1,
            );

            const totalFacilities = await User.countDocuments({
                _id: { $in: friendIds },
                role: 'Cơ sở y tế',
            });
            const pagination = createPagination(limit, page, totalFacilities);

            const dbFriendsData = await User.find({
                _id: { $in: friendIds },
                role: 'Cơ sở y tế',
            })
                .select('-password')
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const formatedFacilities = dbFriendsData.map((friend) => {
                return {
                    ...friend._doc,
                    isFriend: false,
                    isFollowed: true,
                };
            });

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/user/friends/followed-facilities?limit=${
                    pagination.perPage
                }&page=${pagination.currentPage + 1}`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/user/friends/followed-facilities?limit=${
                    pagination.perPage
                }&page=${pagination.currentPage - 1}`;
            }

            res.status(200).json({
                data: formatedFacilities,
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
    getFriendRequests: async (req, res) => {
        try {
            const receiverId = req.user.id;
            const limit = req.query.limit ? Number(req.query.limit) : 15;
            const page = req.query.page ? Number(req.query.page) : 1;
            //
            const existingUser = await User.findById(receiverId);
            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create pagination
            const totalFriendRequests = await FriendRequest.countDocuments({
                receiverId,
                status: 'pending',
            });
            const pagination = createPagination(limit, page, totalFriendRequests);

            // Get friend requests and format
            const dbFriendRequests = await FriendRequest.find({
                receiverId,
                status: 'pending',
            });
            const formatedFriendRequest = await Promise.all(
                dbFriendRequests.map(async (request) => {
                    const sender = await User.findById(request.senderId).select('-password');
                    return {
                        ...sender._doc,
                        friendRequest: request,
                    };
                }),
                false,
            );

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/friends/requests?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/friends/requests?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            res.status(200).json({
                data: formatedFriendRequest,
                pagination: {
                    ...pagination,
                    links,
                },
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            res.status(500).json({ error: 'An error occurred while sending friend request' });
        }
    },
    sendFriendRequest: async (req, res) => {
        try {
            const senderId = req.user.id;
            const { receiverId } = req.body;

            const dbSender = await User.findById(senderId).select('-password');
            const dbReceiver = await User.findById(receiverId).select('-password');

            const existingSendRequest = await FriendRequest.findOne({
                senderId,
                receiverId,
                status: 'pending',
            });

            const existingFriend = await Friends.findOne({
                $or: [
                    { userId1: senderId, userId2: receiverId },
                    { userId1: receiverId, userId2: senderId },
                ],
            });

            if (existingSendRequest || existingFriend) {
                return res.status(400).json({ error: 'Friend request already sent' });
            }

            //Check if you have receive any requests before
            const existingReceiveRequest = await FriendRequest.findOne({
                senderId: receiverId,
                receiverId: senderId,
                status: 'pending',
            });

            if (existingReceiveRequest) {
                const dbFriendRequest = await FriendRequest.updateOne({
                    senderId: receiverId,
                    receiverId: senderId,
                    status: 'accepted',
                });

                await Friends.create({
                    userId1: receiverId,
                    userId2: senderId,
                });

                return res.status(200).json({
                    ...dbReceiver,
                    isFriend: true,
                    friendRequest: dbFriendRequest,
                });
            }
            const dbFriendRequest = await FriendRequest.create({
                senderId,
                receiverId,
            });

            if (dbFriendRequest) {
                const existingRequest = await Notification.findOne({
                    userId: receiverId,
                    type: `FriendRequest_null_${dbSender._id}`,
                });
                if (!existingRequest) {
                    await Notification.create({
                        userId: receiverId,
                        content: {
                            text: `<p><strong>${dbSender.username}</strong> đã gửi cho bạn lời mời kết bạn</p>`,
                            link: `/friends/requests`,
                            image: dbSender.avatar,
                        },
                        type: `FriendRequest_null_${dbSender._id}`,
                    });
                }
            }

            res.status(201).json({
                ...dbReceiver._doc,
                isFriend: false,
                friendRequest: dbFriendRequest,
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            res.status(500).json({ error: 'An error occurred while sending friend request' });
        }
    },
    cancelFriendRequest: async (req, res) => {
        try {
            const senderId = req.user.id;
            const { receiverId } = req.body;

            const dbReceiver = await User.findById(receiverId).select('-password');

            await FriendRequest.deleteOne({
                senderId,
                receiverId,
            });

            res.status(201).json({
                ...dbReceiver._doc,
                isFriend: false,
                friendRequest: {},
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            res.status(500).json({ error: 'An error occurred while sending friend request' });
        }
    },
    acceptFriendRequest: async (req, res) => {
        try {
            const receiverId = req.user.id;
            const { requestId } = req.body;

            const dbFriendRequest = await FriendRequest.findOneAndUpdate(
                {
                    _id: requestId,
                    receiverId,
                    status: 'pending',
                },
                {
                    status: 'accepted',
                },
                {
                    new: true,
                },
            );
            if (!dbFriendRequest) return res.status(404).json({ error: 'Friend request not found ' });

            await Friends.create({
                userId1: dbFriendRequest.senderId,
                userId2: dbFriendRequest.receiverId,
            });
            const dbUser = await User.findById(dbFriendRequest.senderId).select('-password');
            res.status(200).json({
                ...dbUser._doc,
                isFriend: true,
                friendRequest: dbFriendRequest,
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            res.status(500).json({ error: 'An error occurred while sending friend request' });
        }
    },
    rejectFriendRequest: async (req, res) => {
        try {
            const receiverId = req.user.id;
            const { requestId } = req.body;

            const dbFriendRequest = await FriendRequest.findOneAndUpdate(
                {
                    _id: requestId,
                    receiverId,
                    status: 'pending',
                },
                {
                    status: 'rejected',
                },
                {
                    new: true,
                },
            );

            const dbUser = await User.findById(dbFriendRequest.senderId).select('-password');

            res.status(200).json({
                ...dbUser._doc,
                isFriend: false,
                friendRequest: dbFriendRequest,
            });
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            res.status(500).json({ error: 'An error occurred while rejecting friend request' });
        }
    },
    unfriend: async (req, res) => {
        try {
            const userId = req.user.id;
            const { friendId } = req.body;

            const dbFriend = await Friends.findOneAndDelete({
                $or: [
                    { userId1: userId, userId2: friendId },
                    { userId1: friendId, userId2: userId },
                ],
            });

            await FriendRequest.findOneAndDelete({
                $or: [
                    { senderId: userId, receiverId: friendId },
                    { senderId: friendId, receiverId: userId },
                ],
            });

            const dbUser = await User.findById(friendId).select('-password');

            return res.status(200).json({
                ...dbUser._doc,
                isFriend: false,
                friendRequest: {},
            });
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            res.status(500).json({ error: 'An error occurred while rejecting friend request' });
        }
    },
    follow: async (req, res) => {
        try {
            const senderId = req.user.id;
            const { receiverId } = req.body;

            const dbSender = await User.findById(senderId).select('-password');
            const dbReceiver = await User.findOne({
                _id: receiverId,
                role: 'Cơ sở y tế',
            }).select('-password');
            if (!dbReceiver) return res.status(404).json({ error: 'User not found' });

            const existingFollow = await Friends.findOne({
                $or: [
                    { userId1: senderId, userId2: receiverId },
                    { userId1: receiverId, userId2: senderId },
                ],
            });

            if (existingFollow) {
                return res.status(400).json({ error: 'Follow request already sent' });
            }

            const dbFollow = await Friends.create({
                userId1: senderId,
                userId2: receiverId,
            });

            if (dbFollow) {
                const existingNotifi = await Notification.findOne({
                    userId: receiverId,
                    'content.link': `/user/${dbSender._id}`,
                    type: `Follow_null_${dbSender._id}`,
                });

                if (!existingNotifi) {
                    await Notification.create({
                        userId: receiverId,
                        content: {
                            text: `<p><strong>${dbSender.username}</strong> đã bắt đầu theo dõi bạn</p>`,
                            link: `/user/${dbSender._id}`,
                            image: dbSender.avatar,
                        },
                        type: `Follow_null_${dbSender._id}`,
                    });
                }
            }

            res.status(201).json({
                ...dbReceiver._doc,
                isFriend: false,
                isFollowed: true,
                friendRequest: {},
            });
        } catch (error) {
            console.error('Error sending follow request:', error);
            res.status(500).json({ error: 'An error occurred while sending follow request' });
        }
    },
    unfollow: async (req, res) => {
        try {
            const userId = req.user.id;
            const { receiverId } = req.body;

            await Friends.findOneAndDelete({
                $or: [
                    { userId1: userId, userId2: receiverId },
                    { userId1: receiverId, userId2: userId },
                ],
            });

            const dbUser = await User.findById(receiverId).select('-password');

            return res.status(200).json({
                ...dbUser._doc,
                isFriend: false,
                isFollowed: false,
                friendRequest: {},
            });
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            res.status(500).json({ error: 'An error occurred while rejecting friend request' });
        }
    },
    searchMyFriends: async (req, res) => {
        try {
            const userId = req.user.id;
            const q = req.query.q;

            const dbUsers = await User.find({
                _id: { $ne: userId },
                $text: { $search: q },
            }).select('-password');

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedResults = [];

            dbUsers.forEach(async (user) => {
                const isFriend = friendIds.includes(user._id.toString());
                if (isFriend) {
                    formattedResults.push({
                        ...user._doc,
                        isFriend: isFriend ? true : false,
                        friendRequest: {},
                    });
                }
            });

            return res.status(200).json(formattedResults);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },

    // getFollowers: async (req, res) => {
    //     try {
    //         const userId = req.user.id;
    //         const limit = req.query.limit ? Number(req.query.limit) : 15;
    //         const page = req.query.page ? Number(req.query.page) : 1;

    //         const dbUser = await User.findOne({
    //             _id: userId,
    //             role: 'Cơ sở y tế',
    //         });

    //         if (!dbUser) return res.status(404).json({ error: 'User not found' });

    //         // Get friends id
    //         const friends = await Friends.find({
    //             $or: [{ userId1: userId }, { userId2: userId }],
    //         });
    //         const friendIds = friends.map((friend) =>
    //             friend.userId1.toString() === userId.toString() ? friend.userId2 : friend.userId1,
    //         );

    //         const totalFollowers = await User.countDocuments({
    //             _id: { $in: friendIds },
    //         });

    //         const pagination = createPagination(limit, page, totalFollowers);

    //         // Get all friend data
    //         const dbFollowersData = await User.find({
    //             _id: { $in: friendIds },
    //         })
    //             .select('-password')
    //             .limit(pagination.perPage)
    //             .skip(pagination.offSet);

    //         const formatedFollowers = dbFollowersData.map((friend) => {
    //             return {
    //                 ...friend._doc,
    //                 isFriend: false,
    //                 isFollowed: false,
    //                 friendRequest: {},
    //             };
    //         });

    //         let links = {};
    //         if (pagination.currentPage < pagination.totalPages) {
    //             links.next = `${process.env.BASE_URL}api/user/friends/followers?limit=${pagination.perPage}&page=${
    //                 pagination.currentPage + 1
    //             }`;
    //         }
    //         if (pagination.currentPage > 1) {
    //             links.prev = `${process.env.BASE_URL}api/user/friends/followers?limit=${pagination.perPage}&page=${
    //                 pagination.currentPage - 1
    //             }`;
    //         }

    //         res.status(200).json({
    //             data: formatedFollowers,
    //             pagination: {
    //                 ...pagination,
    //                 links,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             errors: error.errors,
    //         });
    //     }
    // },
};

module.exports = friendControllers;
