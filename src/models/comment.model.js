const mongoose = require("mongoose");

const CommentModel = mongoose.model(
    "comments",
    new mongoose.Schema({
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: String,
            ref: "users",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        likes: {
            type: Map,
            default: { qty: 0, users: [] }
        },
        notLikes: {
            type: Map,
            default: { qty: 0, users: [] }
        }
    })
);

module.exports = CommentModel;