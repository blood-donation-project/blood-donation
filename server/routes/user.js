const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

router.get('/get-user', middlewareController.verifyToken, userController.getUser);

module.exports = router;
