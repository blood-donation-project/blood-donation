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

router.post(
    '/join-event/:id',
    middlewareController.verifyToken,
    eventController.joinEvent
);

router.post(
    '/cancel-join/:id',
    middlewareController.verifyToken,
    eventController.cancelEvent
);

router.post(
    '/check-register/:id',
    middlewareController.verifyToken,
    eventController.checkRegisEvent
);

router.post(
    '/delete-event/:id',
    middlewareController.verifyToken,
    eventController.deleteEvent
);

router.get(
    '/detail-event/:id',
    middlewareController.verifyToken,
    eventController.getEventByIdEven
);

router.post('/', middlewareController.verifyToken, eventController.getEvent);

module.exports = router;
