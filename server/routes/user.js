const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

router.get(
    '/get-user',
    middlewareController.verifyToken,
    userController.getUser
);

router.get(
    '/get-user-by-id/:id',
    middlewareController.verifyToken,
    userController.getUserById
);

router.get(
    '/get-user-by-months',
    userController.getUserByMonths
);

router.post(
    '/update-user',
    middlewareController.verifyToken,
    userController.updateUser
);
module.exports = router;
