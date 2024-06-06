const router = require('express').Router();
const eventController = require('../controllers/eventController');
const middlewareController = require('../controllers/middlewareController');

router.post(
    '/create-event',
    middlewareController.verifyTokenAndHealth,
    eventController.createEvent
);

router.post(
    '/manage-events',
    middlewareController.verifyToken,
    eventController.getEventById
);

router.get('/detail-event/:id', middlewareController.verifyToken, eventController.getEventByIdEven)

router.post('/', middlewareController.verifyToken, eventController.getEvent);

module.exports = router;
