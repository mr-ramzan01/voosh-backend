const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        password: {type: String, required: true, select: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;