const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        sub_total: {
            type: Number,
            required: true,
        },
        items: {
            type: Array,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;