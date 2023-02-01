const express = require('express');
const { addOrder, getOrder } = require('../controllers/orderController.js');
const isAuthenticated = require('../middlewares/auth.js');

const orderRouter = express.Router();

orderRouter.get('/get-order', isAuthenticated, getOrder);
orderRouter.post('/add-order', isAuthenticated, addOrder);

module.exports = orderRouter;