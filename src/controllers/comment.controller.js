const db = require("../models");
const CommentModel = db.comment;
const UserModel = db.user;

exports.addComment = async function (req, res) {

    try {

        const user = await UserModel.findById(req.body['email']);

        const comment = new CommentModel({
            createdBy: user._id,
            text: req.body.text,
        });

        await comment.save();

        return res.status(201).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};

exports.getComment = async function (req, res) {

    try {

        const comment = await CommentModel.findById(req.params['commentId']);

        return res.status(200).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};

exports.getComments = async function (req, res) {

    try {

        let filter = {};

        if (req.query.hasOwnProperty('email')) {

            filter.createdBy = req.query['email'];
        }

        const comments = await CommentModel.find(filter);

        return res.status(200).send(comments);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};