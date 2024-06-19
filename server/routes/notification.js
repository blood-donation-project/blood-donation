const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const notificationController = require('../controllers/notificationController');

router.post('/get-all-notifications', middlewareController.verifyToken, notificationController.getAllNotifi);

router.post(
    '/get-notifications-invite-event',
    middlewareController.verifyToken,
    notificationController.getNotificationEvent,
);

module.exports = router;
