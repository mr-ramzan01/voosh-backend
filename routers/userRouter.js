const express = require('express');
const { SignUPUser, LoginUser, LoggedInUser, LoggedOutUser } = require('../controllers/userController.js');
const isAuthenticated = require('../middlewares/auth.js');

const userRouter = express.Router();

userRouter.post('/add-user', SignUPUser);
userRouter.post('/login-user', LoginUser);
userRouter.get('/loggedInUser', isAuthenticated, LoggedInUser);
userRouter.get('/loggedOutUser', isAuthenticated, LoggedOutUser);

module.exports = userRouter;