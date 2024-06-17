const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const friendControllers = require('../controllers/friendControllers');

router.get('/suggests', middlewareController.verifyToken, friendControllers.getSuggestedUsers);
router.get('/', middlewareController.verifyToken, friendControllers.getAllFriends);
// router.get('/followers', middlewareController.verifyToken, friendControllers.getFollowers);
router.get('/followed-facilities', middlewareController.verifyToken, friendControllers.getAllFollowedFacilities);
router.get('/requests', middlewareController.verifyToken, friendControllers.getFriendRequests);
router.post('/requests/send', middlewareController.verifyToken, friendControllers.sendFriendRequest);
router.post('/requests/cancel', middlewareController.verifyToken, friendControllers.cancelFriendRequest);
router.post('/requests/accept', middlewareController.verifyToken, friendControllers.acceptFriendRequest);
router.post('/requests/reject', middlewareController.verifyToken, friendControllers.rejectFriendRequest);
router.post('/unfriend', middlewareController.verifyToken, friendControllers.unfriend);
router.post('/follow', middlewareController.verifyToken, friendControllers.follow);
router.post('/unfollow', middlewareController.verifyToken, friendControllers.unfollow);

module.exports = router;
