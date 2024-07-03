const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Refresh Token
router.post('/refresh-token', authController.requestRefreshToken);

// Logout
router.post('/logout', middlewareController.verifyToken, authController.logout);

// Forgot Password
router.post('/forgotpassword', authController.forgotPass);

router.post('/verifyOTP', authController.verifyOTP);

router.post('/sendEmailForgotPassByIdCard', authController.sendEmailFPByIDCard);

// Change Password using token
router.patch('/:id/forgotpass/:token', authController.changePass);
// Check invalid change password token
router.get('/:id/checkChangePassToken/:token', authController.checkChangePassToken);

router.get('/:idcard/checkEmailByIdCard/:token', authController.checkEmailByIDCard);
// Verify Account
router.get('/:id/verify/:token', authController.verify);

router.get('/:id/verify/:token', authController.verify);

module.exports = router;
