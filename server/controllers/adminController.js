const Post = require('../models/posts');
const jwt = require('jsonwebtoken');

const adminController = {
    getAllPost: async (req, res) => {
        try {
            const { searchTerm } = req.body;
            console.log(req.body);
            let query = {};
            if (searchTerm) {
                const isObjectId = mongoose.Types.ObjectId.isValid(searchTerm);
                if (isObjectId) {
                    query._id = searchTerm;
                } else {
                    query.eventName = { $regex: searchTerm, $options: 'i' };
                }
            }
            const posts = await Post.find(query).populate({
                path: 'userId',
                select: 'username avatar introduce',
            });
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = adminController;
