const Posts = require('../models/posts');
const Reactions = require('../models/reactions');
const Comments = require('../models/comments');
const Friends = require('../models/friends');
const FriendRequest = require('../models/friendRequests');
const Notification = require('../models/notifications');
const mongoose = require('mongoose');
const User = require('../models/user');

const dotenv = require('dotenv');
dotenv.config();

const createPagination = require('../utils/pagination/createPagination');
const uploadImageCloudinary = require('../utils/cloudinary/uploadImage');

const postControllers = {
    createPost: async (req, res) => {
        try {
            const { id } = req.user;
            const image = req.file;
            const clientPostData = req.body;

            if (image) {
                const { url } = await uploadImageCloudinary(image);
                const author = await User.findById(id).select('-password');
                const dbPostData = await Posts.create({
                    userId: id,
                    image: url,
                    content: clientPostData.content,
                    verified: false,
                });

                return res.status(201).json({
                    ...dbPostData._doc,
                    author,
                });
            }

            const author = await User.findById(id).select('-password');
            const dbPostData = await Posts.create({
                userId: id,
                image: '',
                content: clientPostData.content,
                verified: false,
            });

            return res.status(201).json({
                ...dbPostData._doc,
                author,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    deletePost: async (req, res) => {
        try {
            const userId = req.user.id;
            const postId = req.params.id;

            const dbPostData = await Posts.findOne({
                _id: postId,
                userId,
            });

            if (!dbPostData) {
                return res.status(404).json({
                    error: 'Post not found',
                });
            }

            await Posts.deleteOne({
                _id: postId,
                userId,
            });

            return res.status(200).json({
                postId: postId,
                message: 'Post deleted successfully',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    getPostsByUserId: async (req, res) => {
        try {
            const myId = req.user.id;
            const userId = req.params.userId;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            // Tạo pagination
            const totalPosts = await Posts.countDocuments({
                userId,
                verified: true,
            });
            const pagination = createPagination(limit, page, totalPosts);

            const posts = await Posts.find({
                userId,
                verified: true,
            })
                .limit(pagination.perPage)
                .skip(pagination.offSet)
                .sort({ createdAt: -1 })
                .lean();

            const friends = await Friends.find({
                $or: [{ userId1: myId }, { userId2: myId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === myId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedPosts = await Promise.all(
                posts.map(async (post) => {
                    const commentCount = await Comments.countDocuments({ postId: post._id });
                    const likeCount = await Reactions.countDocuments({ postId: post._id });
                    const liked = await Reactions.exists({ postId: post._id, userId: myId });
                    const isFriend = friendIds.includes(post.userId.toString());
                    const author = await User.findById(post.userId).select('-password');
                    const friendRequest = await FriendRequest.findOne({
                        $or: [
                            { senderId: myId, receiverId: post.userId },
                            { senderId: post.userId, receiverId: myId },
                        ],
                        status: 'pending',
                    });

                    return {
                        ...post,
                        commentCount,
                        likeCount,
                        liked: liked ? true : false,

                        author: {
                            ...author._doc,
                            friendRequest,
                            isFriend,
                        },
                    };
                }),
            );

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/posts?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/posts?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedPosts,
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
    getPostsPendingApprovalByUserId: async (req, res) => {
        try {
            const myId = req.user.id;
            const userId = req.params.userId;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            if (myId !== userId) return res.status(403).json({ error: ' You do not have access to this resource.' });

            // Tạo pagination
            const totalPosts = await Posts.countDocuments({
                userId,
                verified: false,
            });
            const pagination = createPagination(limit, page, totalPosts);

            const posts = await Posts.find({
                userId,
                verified: false,
            })
                .limit(pagination.perPage)
                .skip(pagination.offSet)
                .sort({ createdAt: -1 })
                .lean();

            const formattedPosts = await Promise.all(
                posts.map(async (post) => {
                    const commentCount = await Comments.countDocuments({ postId: post._id });
                    const likeCount = await Reactions.countDocuments({ postId: post._id });
                    const liked = await Reactions.exists({ postId: post._id, userId });
                    const author = await User.findById(post.userId).select('-password');

                    return {
                        ...post,
                        commentCount,
                        likeCount,
                        liked: liked ? true : false,

                        author: {
                            ...author._doc,
                            friendRequest: {},
                            isFriend: false,
                        },
                    };
                }),
            );

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/posts/pending-approval?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/posts/pending-approval?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedPosts,
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
    getPostById: async (req, res) => {
        try {
            const myId = req.user.id;
            const postId = req.params.postId;

            const dbPost = await Posts.findOne({
                _id: postId,
                verified: true,
            });
            if (!dbPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            const commentCount = await Comments.countDocuments({ postId: dbPost._id });
            const likeCount = await Reactions.countDocuments({ postId: dbPost._id });
            const liked = await Reactions.exists({ postId: dbPost._id, userId: myId });
            const author = await User.findById(dbPost.userId).select('-password');
            const isFriend = await Friends.find({
                $or: [
                    { userId1: myId, userId2: dbPost.userId },
                    { userId1: dbPost.userId, userId2: myId },
                ],
            });

            const friendRequest = await FriendRequest.findOne({
                $or: [
                    { senderId: myId, receiverId: dbPost.userId },
                    { senderId: dbPost.userId, receiverId: myId },
                ],
                status: 'pending',
            });

            return res.status(200).json({
                ...dbPost._doc,
                commentCount,
                likeCount,
                liked: liked ? true : false,

                author: {
                    ...author._doc,
                    friendRequest,
                    isFriend: isFriend ? true : false,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    getHomePagePosts: async (req, res) => {
        try {
            const userId = req.user.id;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            // Tạo pagination
            const totalPosts = await Posts.countDocuments({
                verified: true,
            });
            const pagination = createPagination(limit, page, totalPosts);

            const posts = await Posts.find({
                verified: true,
            })
                .limit(pagination.perPage)
                .skip(pagination.offSet)
                .sort({ createdAt: -1 })
                .lean();

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedPosts = await Promise.all(
                posts.map(async (post) => {
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
                    if (author.role === 'Cơ sở y tế') {
                        return {
                            ...post,
                            commentCount,
                            likeCount,
                            liked: liked ? true : false,

                            author: {
                                ...author._doc,
                                friendRequest,
                                isFriend: false,
                                isFollowed: isFriend ? true : false,
                            },
                        };
                    }
                    return {
                        ...post,
                        commentCount,
                        likeCount,
                        liked: liked ? true : false,

                        author: {
                            ...author._doc,
                            friendRequest,
                            isFriend,
                            isFollowed: false,
                        },
                    };
                }),
            );

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/posts?limit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/posts?limit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedPosts,
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

    getCommentByPostId: async (req, res) => {
        try {
            const userId = req.user.id;
            const postId = req.params.id;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            // Tạo pagination
            const totalPosts = await Comments.countDocuments({
                postId: postId,
            });
            const pagination = createPagination(limit, page, totalPosts);

            const dbCommentPostData = await Comments.find({
                postId: postId,
            })
                .sort({ createAt: -1 })
                .limit(pagination.perPage)
                .skip(pagination.offSet);

            const friends = await Friends.find({
                $or: [{ userId1: userId }, { userId2: userId }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === userId ? friend.userId2.toString() : friend.userId1.toString(),
            );

            const formattedComemnts = await Promise.all(
                dbCommentPostData.map(async (comment) => {
                    const user = await User.findById(comment.userId).select('-password');
                    const isFriend = friendIds.includes(comment.userId.toString());

                    const friendRequest = await FriendRequest.findOne({
                        $or: [
                            { senderId: userId, receiverId: comment.userId },
                            { senderId: comment.userId, receiverId: userId },
                        ],
                        status: 'pending',
                    });

                    return {
                        ...comment._doc,
                        user: {
                            ...user._doc,
                            isFriend,
                            friendRequest,
                        },
                    };
                }),
            );

            let links = {};
            if (pagination.currentPage < pagination.totalPages) {
                links.next = `${process.env.BASE_URL}api/postlimit=${pagination.perPage}&page=${
                    pagination.currentPage + 1
                }`;
            }
            if (pagination.currentPage > 1) {
                links.prev = `${process.env.BASE_URL}api/postlimit=${pagination.perPage}&page=${
                    pagination.currentPage - 1
                }`;
            }

            return res.status(200).json({
                data: formattedComemnts,
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
    createComment: async (req, res) => {
        try {
            const { id } = req.user;
            const postId = req.params.id;
            const clientCommentData = req.body;

            const user = await User.findById(id).select('-password');
            const post = await Posts.findById(postId);

            if (!clientCommentData.content || clientCommentData.content.trim() === '') {
                return res.status(400).json({ error: 'Comment content is required' });
            }

            const dbCommentData = await Comments.create({
                userId: id,
                postId: postId,
                content: clientCommentData.content,
            });

            if (id !== post.userId.toString()) {
                const existingNotifi = await Notification.findOne({
                    userId: post.userId,
                    'content.link': `/post/${postId}`,
                    type: `Like_${postId}_${user._id}`,
                });
                if (!existingNotifi) {
                    await Notification.create({
                        userId: post.userId,
                        content: {
                            text: `<p><strong>${user.username}</strong> đã bình luận bài viết của bạn</p>`,
                            link: `/post/${postId}`,
                            image: user.avatar,
                        },
                        type: `Like_${postId}_${user._id}`,
                    });
                }
            }

            const commentCount = await Comments.countDocuments({ postId: post._id });
            const likeCount = await Reactions.countDocuments({ postId: post._id });
            const liked = await Reactions.exists({ postId: post._id, userId: id });

            //

            return res.status(201).json({
                ...dbCommentData._doc,
                post: {
                    ...post._doc,
                    commentCount,
                    likeCount,
                    liked: liked ? true : false,
                },
                user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },

    likePost: async (req, res) => {
        try {
            const { id } = req.user;
            const postId = req.params.id;

            const dbUser = await User.findById(id).select('-password');
            const isLiked = await Reactions.findOne({
                userId: id,
                postId: postId,
            });
            const post = await Posts.findById(postId);

            if (!isLiked) {
                await Reactions.create({
                    userId: id,
                    postId: postId,
                });

                if (id !== post.userId.toString()) {
                    const existingNotifi = await Notification.findOne({
                        userId: post.userId,
                        'content.link': `/post/${postId}`,
                        type: `Like_${postId}_${dbUser._id}`,
                    });
                    if (!existingNotifi) {
                        await Notification.create({
                            userId: post.userId,
                            content: {
                                text: `<p><strong>${dbUser.username}</strong> đã thích bài viết của bạn</p>`,
                                link: `/post/${postId}`,
                                image: dbUser.avatar,
                            },
                            type: `Like_${postId}_${dbUser._id}`,
                        });
                    }
                }
            }
            //
            const commentCount = await Comments.countDocuments({ postId: post._id });
            const likeCount = await Reactions.countDocuments({ postId: post._id });
            //
            const author = await User.findById(post.userId).select('-password');
            const friendship = await Friends.findOne({
                $or: [
                    { userId1: id, userId2: author._id },
                    { userId1: author._id, userId2: id },
                ],
            });

            return res.status(201).json({
                ...post._doc,
                commentCount,
                likeCount,
                liked: true,
                author: {
                    ...author._doc,
                    isFriend: friendship ? true : false,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },

    unLikePost: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.user;
            const postId = req.params.id;

            const isLiked = await Reactions.findOne({
                userId: id,
                postId: postId,
            });

            if (isLiked) {
                await Reactions.deleteOne({
                    userId: id,
                    postId: postId,
                });
            }
            //
            const post = await Posts.findById(postId);
            const commentCount = await Comments.countDocuments({ postId: post._id });
            const likeCount = await Reactions.countDocuments({ postId: post._id });
            //
            const author = await User.findById(post.userId).select('-password');
            const friendship = await Friends.findOne({
                $or: [
                    { userId1: id, userId2: author._id },
                    { userId1: author._id, userId2: id },
                ],
            });

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({
                ...post._doc,
                commentCount,
                likeCount,
                liked: false,
                author: {
                    ...author._doc,
                    isFriend: friendship ? true : false,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: error.errors,
            });
        }
    },
    getAllPost: async (req, res) => {
        try {
            const { searchTerm } = req.body;
            let query = {
                verified: true,
            };
            if (searchTerm) {
                const isObjectId = mongoose.Types.ObjectId.isValid(searchTerm);
                if (isObjectId) {
                    query._id = searchTerm;
                } else {
                    query.content = { $regex: searchTerm, $options: 'i' };
                }
            }
            const posts = await Posts.find(query).populate({
                path: 'userId',
                select: 'username avatar introduce',
            });
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUnpublishedPost: async (req, res) => {
        try {
            const { searchContent, startDate, endDate } = req.body;
            let query = {
                verified: false,
            };

            if (searchContent) {
                query.content = { $regex: searchContent, $options: 'i' };
            }

            if (startDate && endDate) {
                query.createdAt = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                };
            }

            console.log(query);
            const postsUnPublish = await Posts.find(query)
                .populate({
                    path: 'userId',
                    select: 'username avatar introduce',
                })
                .sort({ createdAt: -1 });
            res.status(200).json(postsUnPublish);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    publishPosts: async (req, res) => {
        const { postId } = req.body;

        const post = await Posts.findOne({ _id: postId }).populate({
            path: 'userId',
            select: 'username avatar introduce',
        });
        if (!post) {
            return res.status(400).json('Post not found');
        }
        const content = {
            text: `<p>Xin chào!👋 <strong>${post.userId.username}</strong>. Bài viết của bạn đã được duyệt thành công! Hãy cùng nhau xây dựng một cộng đồng hiến máu văn minh nhé ❤️</p>`,
        };
        const publishPosts = await Posts.findByIdAndUpdate(postId, { verified: true });

        const author = await User.findById(publishPosts.userId);
        if (publishPosts && author.role === 'Cơ sở y tế') {
            const friends = await Friends.find({
                $or: [{ userId1: author._id }, { userId2: author._id }],
            });
            const friendIds = friends.map((friend) =>
                friend.userId1.toString() === author._id.toString() ? friend.userId2 : friend.userId1,
            );

            const notifications = friendIds.map((friendId) => ({
                userId: friendId,
                content: {
                    text: `<p><strong>${author.username}</strong> đã đăng tải một bài viết mới</p>`,
                    link: `/posts/${publishPosts._id}`,
                    image: author.avatar,
                },
                type: `CreatePost_${publishPosts._id}_${author._id}`,
            }));

            await Notification.insertMany(notifications);
        }

        res.status(200).json(publishPosts);
    },
    getPostByMonths: async (req, res) => {
        try {
            const allMonths = Array.from({ length: 12 }, (_, i) =>
                new Date(0, i).toLocaleString('en-US', { month: 'long' }),
            );
            const currentYear = new Date().getFullYear();

            console.log('Current Year:', currentYear);

            const result = await Posts.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(`${currentYear}-01-01`),
                            $lt: new Date(`${currentYear + 1}-01-01`),
                        },
                    },
                },
                {
                    $facet: {
                        postsByMonth: [
                            {
                                $group: {
                                    _id: { $month: '$createdAt' },
                                    count: { $sum: 1 },
                                },
                            },
                            { $sort: { _id: 1 } },
                        ],
                        totalPosts: [{ $count: 'count' }],
                    },
                },
            ]);

            const postsByMonth = fillMissingMonths(result[0].postsByMonth, allMonths);
            const totalPosts = result[0].totalPosts[0]?.count || 0;

            res.status(200).json({
                postsByMonth,
                totalPosts,
            });
        } catch (error) {
            console.error('Error in getPostsByMonths:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    refusePost: async (req, res) => {
        try {
            const { postId } = req.body;

            const post = await Posts.findOne({ _id: postId }).populate({
                path: 'userId',
                select: 'username avatar introduce',
            });
            if (!post) {
                return res.status(400).json('Post not found');
            }

            await Posts.findByIdAndDelete(postId);

            const content = {
                text: `<p>Xin chào 👋 <strong>${post.userId.username}</strong>. Bài viết của bạn đã bị từ chối ❌</p>`,
            };
            const newNotification = new Notification({
                userId: post.userId._id,
                content,
                type: 'RefusePosts',
            });
            await newNotification.save();
            res.status(200).json({ message: 'Delete Post Successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deletePostByAdmin: async (req, res) => {
        try {
            const { postId } = req.body;

            const post = await Posts.findOne({ _id: postId }).populate({
                path: 'userId',
                select: 'username avatar introduce',
            });
            if (!post) {
                return res.status(400).json('Post not found');
            }

            await Posts.findByIdAndDelete(postId);

            const content = {
                text: `<p>Xin chào 👋 <strong>${post.userId.username}</strong>. Bài viết của bạn đã bị xóa bởi Admin ❌</p>`,
            };
            const newNotification = new Notification({
                userId: post.userId._id,
                content,
                type: 'DeletePosts',
            });
            await newNotification.save();
            res.status(200).json({ message: 'Delete Post Successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
const fillMissingMonths = (data, allMonths) => {
    const monthCountMap = new Map(data.map((item) => [item._id, item.count]));
    return allMonths.map((month) => ({
        month,
        count: monthCountMap.get(allMonths.indexOf(month) + 1) || 0,
    }));
};

module.exports = postControllers;
