const router = require('express').Router();
const eventController = require('../controllers/eventController');
const middlewareController = require('../controllers/middlewareController');

router.post('/create-event', middlewareController.verifyTokenAndHealth, eventController.createEvent);

router.post('/manage-events', middlewareController.verifyToken, eventController.getEventById);

router.post('/join-event/:id', middlewareController.verifyToken, eventController.joinEvent);

router.post('/cancel-join/:id', middlewareController.verifyToken, eventController.cancelEvent);

router.post('/check-register/:id', middlewareController.verifyToken, eventController.checkRegisEvent);

router.post('/get-user-register-event/:id', middlewareController.verifyToken, eventController.getUserRegisterEvent);

router.post('/delete-event/:id', middlewareController.verifyToken, eventController.deleteEvent);

router.put('/update-event/:id', middlewareController.verifyToken, eventController.updateEvent);

router.get('/get-events-by-month', eventController.getEventByMonths);

router.get('/detail-event/:id', middlewareController.verifyToken, eventController.getEventByIdEven);

router.post('/get-all-events', middlewareController.verifyTokenAndAdmin, eventController.getAllEvent);

router.post('/delete-event-by-admin', middlewareController.verifyTokenAndAdmin, eventController.deleteEventByAdmin);

router.post('/', middlewareController.verifyToken, eventController.getEvent);

module.exports = router;
