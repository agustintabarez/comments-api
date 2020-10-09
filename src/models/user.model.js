const mongoose = require("mongoose");

const UserModel = mongoose.model(
    "users",
    new mongoose.Schema({
        _id: String,
    }, {_id: false})
);

module.exports = UserModel;