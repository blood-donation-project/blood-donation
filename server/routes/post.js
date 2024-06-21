const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const uploadSingleImage = require('../utils/multer/uploadSingleImage');
const middlewareController = require('../controllers/middlewareController');

// Get All Post By Admin
router.post('/get-all-posts', middlewareController.verifyTokenAndAdmin, postControllers.getAllPost);
router.get('/get-posts-by-months', middlewareController.verifyTokenAndAdmin, postControllers.getPostByMonths);
router.post('/get-unpublish-posts', middlewareController.verifyTokenAndAdmin, postControllers.getUnpublishedPost);
router.put('/publish-post', middlewareController.verifyTokenAndAdmin, postControllers.publishPosts);
router.post('/refuse-posts', middlewareController.verifyTokenAndAdmin, postControllers.refusePost);
router.post('/delete-post-by-admin', middlewareController.verifyTokenAndAdmin, postControllers.deletePostByAdmin);

// Get home page posts
router.get('/', middlewareController.verifyToken, postControllers.getHomePagePosts);
router.get('/get-by-id/:postId', middlewareController.verifyToken, postControllers.getPostById);
router.get('/:userId', middlewareController.verifyToken, postControllers.getPostsByUserId);
router.get(
    '/:userId/pending-approval',
    middlewareController.verifyToken,
    postControllers.getPostsPendingApprovalByUserId,
);
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
