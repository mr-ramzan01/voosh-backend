const OrderModel = require("../models/orderModel.js");
const UserModel = require("../models/UserModel.js");



async function addOrder(req, res) {
    try {
        const {_id, phoneNumber} = req.user;
        req.body.phoneNumber = phoneNumber;
        req.body.user_id = _id;
        await OrderModel.create(req.body);
        return res.status(200).send({
            success: true,
            message: 'Order added successfully'
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


async function getOrder(req, res) {
    try {
        const {user_id} = req.query;
        let data = await OrderModel.find({user_id: user_id}).sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: 'order data',
            data
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}






module.exports = { addOrder, getOrder };