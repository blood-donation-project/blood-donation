const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');

router.get('/', middlewareController.verifyTokenAndAdmin);

module.exports = router;
