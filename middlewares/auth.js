const jwt = require("jsonwebtoken")
require('dotenv').config();

const jwt_secret_key = process.env.JWT_SECRET_KEY;

function isAuthenticated (req, res, next) {
    try {
        let {voosh} = req.cookies;
        if(!voosh) {
            return res.status(401).send({
                success: false,
                meassage: 'User is not valid'
            })
        }
        try {
            jwt.verify(voosh, jwt_secret_key);
            const user = jwt.decode(voosh);
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Invalid token provided'
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = isAuthenticated;


