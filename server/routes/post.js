const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const uploadSingleImage = require('../utils/multer/uploadSingleImage');
const middlewareController = require('../controllers/middlewareController');

// Get home page posts
router.get('/', middlewareController.verifyToken, postControllers.getHomePagePosts);
router.get('/:userId', middlewareController.verifyToken, postControllers.getPostsByUserId);
// Create post
router.post(
    '/create',
    uploadSingleImage().single('image'),
    middlewareController.verifyToken,
    postControllers.createPost,
);

router.delete('/:id/delete', middlewareController.verifyToken, postControllers.deletePost);

// Get Comment by post id
router.get('/:id/comments', middlewareController.verifyToken, postControllers.getCommentByPostId);
router.post('/:id/comments/create', middlewareController.verifyToken, postControllers.createComment);

router.post('/:id/like', middlewareController.verifyToken, postControllers.likePost);
router.post('/:id/unlike', middlewareController.verifyToken, postControllers.unLikePost);

module.exports = router;
