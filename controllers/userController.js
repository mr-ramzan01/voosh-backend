const UserModel = require("../models/UserModel.js");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;



async function LoggedOutUser(req, res, next) {
    try {
        res.cookie('voosh', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        return res.status(200).send({
            success: true,
            message: 'user logged out successfully'
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


async function LoggedInUser(req, res, next) {
    try {
        let user = await UserModel.findOne({_id: req.user._id});
    
        return res.status(200).send({
            success: true,
            message: 'User logged In',
            data: user
        })
        
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}




async function LoginUser(req, res) {
    try {
        // Checking User email
        let existingUser = await UserModel.findOne({phoneNumber: req.body.phoneNumber}).select("+password");
        if(!existingUser) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        
        const passwordMatches = await bcrypt.compare(req.body.password, existingUser.password);

        if(passwordMatches) {

            // Generating token
            const token = jwt.sign({
                phoneNumber: existingUser.phoneNumber,
                _id: existingUser._id,
            }, jwt_secret_key);
            
            const options = {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true,
                secure: true
            };
            res.status(200).cookie("voosh", token, {...options}).send({
                success: true,
                message: 'Login Successfully',
            })
        }
        else {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


async function SignUPUser(req, res) {
    try {
        // Checking User
        let user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
        if(user) {
            return res.status(403).send({
                success: false,
                message: 'User already exists'
            })
        }
        // Hashing Password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        // Creating User
        const newUser = await UserModel.create({...req.body, password: hashPassword});

        // Generating token
        const token = jwt.sign({
            phoneNumber: newUser.phoneNumber,
            _id: newUser._id,
        }, jwt_secret_key);

        const options = {
            httpOnly: true,
            secure: true
        };
        res.status(200).cookie("voosh", token, {...options}).send({
            success: true,
            message: 'Signup successfully',
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}






module.exports = { SignUPUser, LoginUser, LoggedInUser, LoggedOutUser };