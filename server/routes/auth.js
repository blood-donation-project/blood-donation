const router = require('express').Router();
const authController = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Refresh
router.post('/refresh', authController.requestRefreshToken);

// Logout

router.post('/logout', middlewareController.verifyToken, authController.logout);

// ForgotPass
router.post('/forgotpassword', authController.forgotPass);

router.patch('/:id/forgotpass/:token', authController.changePass);

// Verify Account
router.get('/:id/verify/:token', authController.verify);

module.exports = router;
