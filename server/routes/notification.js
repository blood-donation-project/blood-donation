const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const notificationController = require('../controllers/notificationController');

router.post(
    '/get-all-notifications',
    middlewareController.verifyToken,
    notificationController.getAllNotifi
);

module.exports = router;
