const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get('/', middlewareController.verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the home route!', user: req.user });
});

module.exports = router;
