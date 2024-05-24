const jwt = require('jsonwebtoken');

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
};

module.exports = middlewareController;
