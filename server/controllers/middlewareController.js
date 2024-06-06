const jwt = require('jsonwebtoken');
const User = require('../models/user');

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error) {
                    return res.status(403).json({
                        message: 'Token is not valid.',
                        error: error.message,
                    });
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json({
                message: "You're not authenticated. No token provided.",
            });
        }
    },
    verifyTokenAndHealth: async (req, res, next) => {
        try {
            // 1. Xác thực token (tái sử dụng logic từ verifyToken)
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    message: "You're not authenticated. No token provided.",
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            // 2. Tìm kiếm người dùng dựa trên ID từ token đã giải mã
            const user = await User.findById(decoded.id);
            if (!user) {
                return res
                    .status(401)
                    .json({ message: 'Invalid token. User not found.' });
            }

            // 3. Kiểm tra role và cập nhật req.user
            if (user.role === 'donor') {
                return res.status(403).json({
                    message: 'You are not Medical to access this resource.',
                });
            }

            req.user = user; // Gán thông tin người dùng đã xác thực vào request

            next(); // Cho phép tiếp tục nếu tất cả kiểm tra đều thành công
        } catch (error) {
            // Xử lý tất cả các loại lỗi (token không hợp lệ, lỗi DB, ...)
            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({
                    message: 'Token is not valid.',
                    error: error.message,
                });
            } else {
                console.error(error); // Ghi log lỗi để debug
                return res
                    .status(500)
                    .json({ message: 'Internal server error' });
            }
        }
    },
};
module.exports = middlewareController;
