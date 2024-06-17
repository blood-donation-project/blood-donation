const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const searchControllers = require('../controllers/searchControllers');

router.get('/users', middlewareController.verifyToken, searchControllers.searchUsers);
router.get('/posts', middlewareController.verifyToken, searchControllers.searchPosts);
router.get('/surrounding-users', middlewareController.verifyToken, searchControllers.surroundingUsers);

module.exports = router;
