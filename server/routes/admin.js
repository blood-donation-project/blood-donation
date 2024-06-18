const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');

router.get('/', middlewareController.verifyTokenAndAdmin);

router.get('/get-all-posts', middlewareController.verifyTokenAndAdmin);

module.exports = router;
