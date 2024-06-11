const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const Token = require('../models/token');
const {
    sendEmailActivationEmail,
    sendEmailForgotPassword,
} = require('../utils/sendEmail');
const crypto = require('crypto');

dotenv.config();
let refreshTokens = [];

const authController = {
    register: async (req, res, next) => {
        try {
            const {
                name,
                email,
                password,
                dateOfBirth,
                address,
                phoneNumber,
                gender,
                role,
                bloodGroup,
                avatar,
            } = req.body;

            // Check if email exists
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                return res.status(409).json({ error: 'EMAIL_EXIST' });
            }

            // Check if phone number exists
            const checkPhoneNumber = await User.findOne({ phoneNumber });
            if (checkPhoneNumber) {
                return res.status(409).json({ error: 'PHONENUMBER_EXIST' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const formattedBirthday = moment(dateOfBirth).format('DD/MM/YYYY');
            console.log(formattedBirthday);
            // Create new User
            const newUser = new User({
                username: name,
                email,
                address,
                phoneNumber,
                dateOfBirth: formattedBirthday,
                gender,
                role,
                password: hashedPassword,
                bloodGroup,
                avatar,
                verified: false,
            });

            // Save to DB
            const user = await newUser.save();

            const token = new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
                type: 'activation',
            });
            await token.save();

            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await sendEmailActivationEmail(user.email, url);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    generateAccessToken: (user) => {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '1h' }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '30d' }
        );
    },

    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res
                    .status(404)
                    .json({ code: 401, message: 'Wrong username' });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res
                    .status(404)
                    .json({ code: 401, message: 'Wrong password' });
            }
            if (user.block) {
                return res
                    .status(403)
                    .json({ code: 403, message: 'ACCOUNT_LOCKED' });
            }
            if (!user.verified) {
                let token = await Token.findOne({
                    userId: user._id,
                    type: 'activation',
                });
                if (!token) {
                    token = new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString('hex'),
                        type: 'activation',
                    });
                    await token.save();

                    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                    await sendEmailActivationEmail(user.email, url);
                }
                return res
                    .status(403)
                    .json({ code: 403, message: 'Email is not verified' });
            }

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                path: '/',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            const { password, ...otherDetails } = user._doc;
            res.status(200).json({ ...otherDetails, accessToken });
        } catch (error) {
            next(error);
        }
    },

    forgotPass: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(409).json({ error: 'EMAIL_IS_NOT_EXIST' });
            }

            let token = await Token.findOne({
                userId: user._id,
                type: 'forgotPassword',
            });

            if (!token) {
                token = new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex'),
                    type: 'forgotPassword',
                });
                await token.save();
                const url = `${process.env.BASE_URL}users/${user._id}/forgotpass/${token.token}`;
                await sendEmailForgotPassword(user.email, user.username, url);
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    requestRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json("You're not authenticated");
            }

            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_KEY,
                async (err, user) => {
                    if (err) {
                        return res.status(403).json({
                            code: 403,
                            message: 'RefreshToken is not valid',
                        });
                    }

                    const dbUser = await User.findById(user.id);
                    if (!dbUser) {
                        return res.status(404).json('User not found');
                    }

                    const newAccessToken =
                        authController.generateAccessToken(dbUser);
                    res.status(200).json({ accessToken: newAccessToken });
                }
            );
        } catch (error) {
            next(error);
        }
    },

    logout: (req, res, next) => {
        try {
            res.clearCookie('refreshToken');
            refreshTokens = refreshTokens.filter(
                (token) => token !== req.cookies.refreshToken
            );
            res.status(200).json('Logged out');
        } catch (error) {
            next(error);
        }
    },

    verify: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(400).send({ message: 'Invalid link ID' });
            }

            const token = await Token.findOne({
                userId: user._id,
                token: req.params.token,
                type: 'activation',
            });
            if (!token) {
                return res.status(400).send({ message: 'Invalid link token' });
            }

            user.verified = true;
            await user.save();

            await token.deleteOne();

            res.status(200).send({ message: 'Email verified successfully' });
        } catch (error) {
            next(error);
        }
    },

    changePass: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(400).send({ message: 'Invalid link ID' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const token = await Token.findOne({
                userId: user._id,
                token: req.params.token,
                type: 'forgotPassword',
            });
            if (!token) {
                return res.status(400).send({ message: 'Invalid link token' });
            }

            user.password = hashedPassword;
            await user.save();

            await token.deleteOne();

            res.status(200).send({ message: 'Password changed successfully' });
        } catch (error) {
            next(error);
        }
    },
    checkChangePassToken: async (req, res, next) => {
        const { id, token } = req.params;
        try {
            const checkUser = await Token.findOne({
                userId: id,
                type: 'forgotPassword',
            });
            if (!checkUser) {
                return res.status(400).json({
                    message: 'Đường dẫn không hợp lệ hoặc đã hết hạn',
                });
            }
            const checkToken = (await token) === checkUser.token;
            if (!checkToken) {
                return res.status(400).json({
                    message: ' đã hết hạn',
                });
            }
            return res.status(200).json('Token hợp lệ');
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    },
};

module.exports = authController;
