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
    middlewareController.verifyTokenAndAdmin,
    userController.getUserByMonths
);

router.post(
    '/get-all-users',
    middlewareController.verifyTokenAndAdmin,
    userController.getAllUsers
);

router.put(
    '/lock-or-unlock-user',
    middlewareController.verifyTokenAndAdmin,
    userController.lockorUnLockUser
);

router.post(
    '/update-user',
    middlewareController.verifyToken,
    userController.updateUser
);
module.exports = router;
