const db = require("../models");
const CommentModel = db.comment;
const UserModel = db.user;

exports.addComment = async function (req, res) {

    try {

        const user = await UserModel.findOne({ 'email': req.body.email });

        const comment = new CommentModel({
            createdBy: user._id,
            text: req.body.text,
        });

        await comment.save();

        await comment.populate("createdBy").execPopulate();

        return res.status(201).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};