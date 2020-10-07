const mongoose = require("mongoose");

const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required']
    }
  })
);

module.exports = UserModel;