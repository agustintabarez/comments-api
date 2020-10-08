const mongoose = require("mongoose");

const CommentModel = mongoose.model(
    "comments",
    new mongoose.Schema({
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        amountOfLikes: {
            type: Number,
            default: 0
        },
        amountOfNotLikes: {
            type: Number,
            default: 0
        }
    })
);

module.exports = CommentModel;