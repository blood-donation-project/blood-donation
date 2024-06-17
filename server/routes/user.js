const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

router.get('/get-user', middlewareController.verifyToken, userController.getUser);
router.get('/:id/photos', userController.getPhotos);
router.get('/get-user-by-id/:id', middlewareController.verifyToken, userController.getUserById);

module.exports = router;
