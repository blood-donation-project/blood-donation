const Posts = require('../models/posts');
const Reactions = require('../models/reactions');
const Comments = require('../models/comments');
const Friends = require('../models/friends');
const FriendRequest = require('../models/friendRequests');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const createPagination = require('../utils/pagination/createPagination');
const uploadImageCloudinary = require('../utils/cloudinary/uploadImage');
const User = require('../models/user');

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
            });
            const pagination = createPagination(limit, page, totalPosts);

            const posts = await Posts.find({
                userId,
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

    getHomePagePosts: async (req, res) => {
        try {
            const userId = req.user.id;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;

            // Tạo pagination
            const totalPosts = await Posts.countDocuments();
            const pagination = createPagination(limit, page, totalPosts);

            const posts = await Posts.find()
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

            if (!clientCommentData.content || clientCommentData.content.trim() === '') {
                return res.status(400).json({ error: 'Comment content is required' });
            }

            const dbCommentData = await Comments.create({
                userId: id,
                postId: postId,
                content: clientCommentData.content,
            });

            const post = await Posts.findById(postId);
            const commentCount = await Comments.countDocuments({ postId: post._id });
            const likeCount = await Reactions.countDocuments({ postId: post._id });
            const liked = await Reactions.exists({ postId: post._id, userId: id });

            //
            const user = await User.findById(id).select('-password');
            const author = await User.findById(post.userId).select('-password');
            const friendship = await Friends.findOne({
                $or: [
                    { userId1: id, userId2: author._id },
                    { userId1: author._id, userId2: id },
                ],
            });

            return res.status(201).json({
                ...dbCommentData._doc,
                post: {
                    ...post._doc,
                    commentCount,
                    likeCount,
                    liked: liked ? true : false,
                },
                author: {
                    ...author._doc,
                    isFriend: friendship ? true : false,
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
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.user;
            const postId = req.params.id;

            const isLiked = await Reactions.findOne({
                userId: id,
                postId: postId,
            });

            if (!isLiked) {
                await Reactions.create({
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
};

module.exports = postControllers;
