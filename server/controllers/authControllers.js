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
const token = require('../models/token');
const { error } = require('console');

dotenv.config();
let refreshTokens = [];

const authController = {
    register: async (req, res, next) => {
        try {
            const {
                name,
                email,
                password,
                birthday,
                address,
                phoneNumber,
                gender,
                role,
                bloodGroup,
                avatar,
            } = req.body;
            if (
                !req.body.name ||
                !req.body.email ||
                !req.body.password ||
                !req.body.birthday ||
                !req.body.gender
            ) {
                return res.status(400).json({
                    error: 'MISSING_FIELDS',
                });
            }
            // Check exist email
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                return res.status(409).json({ error: 'EMAIL_EXIST' });
            }

            // Check exist phoneNumber
            const checkPhoneNumber = await User.findOne({ phoneNumber });
            if (checkPhoneNumber) {
                return res.status(409).json({ error: 'PHONENUMBER_EXIST' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const formatbirthday = moment(
                req.body.birthday,
                'DD/MM/YYYY'
            ).format('DD/MM/YYYY');

            // Create new User
            const newUser = await new User({
                username: name,
                email,
                address,
                phoneNumber,
                birthday: formatbirthday,
                gender,
                role,
                password: hashed,
                bloodGroup,
                avatar,
                verified: false,
            });

            // Save to DB
            const user = await newUser.save();
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
                type: 'activation',
            }).save();
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await sendEmailActivationEmail(user.email, url);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    // Generate access token
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '1h' }
        );
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
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
            if (!user.verified) {
                let token = await Token.findOne({
                    userId: user._id,
                    type: 'activation',
                });
                if (!token) {
                    token = await new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString('hex'),
                        type: 'activation',
                    }).save();
                    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                    await sendEmailActivationEmail(user.email, url);
                }
                return res
                    .status(403)
                    .json({ code: 403, message: 'Email is not verify' });
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false, //Deploy set true
                    path: '/',
                    sameSite: 'strict',
                });

                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            next(error);
        }
    },
    forgotPass: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email: email });
            const checkEmail = await User.findOne({ email });
            if (!checkEmail) {
                return res.status(409).json({ error: 'EMAIL_IS_NOT_EXIST' });
            }

            let token = await Token.findOne({
                userId: user._id,
                type: 'forgotPassword',
            });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex'),
                    type: 'forgotPassword',
                }).save();
                const url = `${process.env.BASE_URL}users/${user._id}/forgotpass/${token.token}`;
                await sendEmailForgotPassword(user.email, user.username, url);
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    requestRefreshToken: async (req, res) => {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated");
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );

            // Create new accesstoken, new refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false, //Deploy set true
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },
    logout: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );
        res.status(200).json('Logged out');
    },
    verify: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            console.log(req.params.token);
            if (!user) {
                return res.status(400).send({ message: 'Invalid link ID' });
            }

            const token = await Token.findOne({
                userId: user._id,
                token: req.params.token,
                type: 'activation',
            });
            console.log(token);
            if (!token) {
                return res.status(400).send({ message: 'Invalid link token' });
            }

            await User.updateOne({ _id: user._id, verified: true });
            setTimeout(() => {
                token
                    .deleteOne()
                    .then(() => {})
                    .catch((error) => {
                        console.error(error);
                    });
            }, 5000);

            res.status(200).send({ message: 'Email verified successfully' });
        } catch (error) {
            console.log(error);
        }
    },
    // Change Pass forgotPass
    changePass: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(400).send({ message: 'Invalid link ID' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const token = await Token.findOne({
                userId: user._id,
                token: req.params.token,
                type: 'forgotPassword',
            });
            console.log(token);
            if (!token) {
                return res.status(400).send({ message: 'Invalid link token' });
            }

            await User.updateOne({ _id: user._id, password: hashed });
            setTimeout(() => {
                token
                    .deleteOne()
                    .then(() => {})
                    .catch((error) => {
                        console.error(error);
                    });
            }, 5000);

            res.status(200).send({ message: 'Password changed successfully' });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = authController;
