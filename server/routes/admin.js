const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController');
const adminController = require('../controllers/adminController');

router.get('/', middlewareController.verifyTokenAndAdmin);



module.exports = router;
