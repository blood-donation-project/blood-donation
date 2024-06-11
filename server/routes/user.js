const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

router.get(
    '/get-user',
    middlewareController.verifyToken,
    userController.getUser
);

router.post(
    '/get-user-by-id/:id',
    middlewareController.verifyToken,
    userController.getUserById
);

router.post(
    '/update-user',
    middlewareController.verifyToken,
    userController.updateUser
);
module.exports = router;
