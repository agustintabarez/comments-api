const mongoose = require("mongoose");
const db = require("../models");
const CommentModel = db.comment;

checkIfCommentTextIsValid = async function (req, res, next) {

    if (!req.body.hasOwnProperty('text') || req.body.text === null) {

        return res.status(400).send({message: "Text can not be empty"});
    }

    if (req.body.text.length > 255) {

        return res.status(400).send({message: "Text is too big"});
    }

    next();
};

checkIfCommentExists = async function (req, res, next) {

    if (!req.params.hasOwnProperty('commentId') || req.params['commentId'] === null) {

        return res.status(400).send({message: "Comment id can not be empty"});
    }

    if (! mongoose.isValidObjectId(req.params['commentId'])) {

        return res.status(400).send({message: "Comment id is not valid"});
    }

    const comment = await CommentModel.findById(req.params['commentId']);

    if (comment === null) {

        return res.status(404).send({message: "Comment not found"});
    }

    next();
};

checkIfUserAlreadyReactedToComment = async function (req, res, next) {

    const comment = await CommentModel.findById(req.params['commentId']);

    let usersWhoGaveLike = comment.likes.get('users');
    let usersWhoGaveNotLike = comment.notLikes.get('users');

    if (usersWhoGaveLike.contains(req.body['email']) || usersWhoGaveNotLike.contains(req.body['email'])) {

        return res.status(409).send({message: "User already reacted to this comment"});
    }

    next();
};

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

const userMiddleware = {
    checkIfCommentTextIsValid,
    checkIfCommentExists,
    checkIfUserAlreadyReactedToComment
};

module.exports = userMiddleware;