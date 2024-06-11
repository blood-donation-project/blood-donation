const router = require('express').Router();
const messageController = require('../controllers/messageController');
const middlewareController = require('../controllers/middlewareController');

router.post(
    '/send-message/:id',
    middlewareController.verifyToken,
    messageController.sendMessage
);

router.get(
    '/get-message/:id',
    middlewareController.verifyToken,
    messageController.getMessage
);

router.get(
    '/get-receiver',
    middlewareController.verifyToken,
    messageController.getReceiver
);

module.exports = router;
