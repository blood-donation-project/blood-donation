const jwt = require("jsonwebtoken");

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) =>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) =>{
                if(error){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json("You're not authenticated");
        }
    },
}
module.exports = middlewareController;