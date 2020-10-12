const db = require("../models");
const CommentModel = db.comment;
const UserModel = db.user;
const Redis = db.redis;
const SECONDS_TO_KEEP_COMMENTS_IN_CACHE = 7200;

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

        Redis.set(`comment:${comment._id}`, JSON.stringify(comment), 'EX', SECONDS_TO_KEEP_COMMENTS_IN_CACHE);

        return res.status(200).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};

exports.getComments = async function (req, res) {

    try {

        let filter = {};
        let key = 'comments';

        if (req.query.hasOwnProperty('email')) {

            const { email } = req.query;

            filter.createdBy = email;
            key = `users:${email}:comments`;
        }

        const comments = await CommentModel.find(filter);

        Redis.set(key, JSON.stringify(comments), 'EX', SECONDS_TO_KEEP_COMMENTS_IN_CACHE);

        return res.status(200).send(comments);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};

exports.giveLikeToComment = async function (req, res) {

    try {

        const user = await UserModel.findById(req.body['email']);

        const comment = await CommentModel.findById(req.params['commentId']);

        comment.likes.set('qty', comment.likes.get('qty') + 1);

        comment.likes.get('users').push(user._id);

        await comment.save();

        Redis.del('comments');
        Redis.del(`comment:${comment._id}`);
        Redis.del(`users:${comment.createdBy}:comments`);

        return res.status(200).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};

exports.giveNotLikeToComment = async function (req, res) {

    try {

        const user = await UserModel.findById(req.body['email']);

        const comment = await CommentModel.findById(req.params['commentId']);

        comment.notLikes.set('qty', comment.notLikes.get('qty') + 1);

        comment.notLikes.get('users').push(user._id);

        await comment.save();

        Redis.del('comments');
        Redis.del(`comment:${comment._id}`);
        Redis.del(`users:${comment.createdBy}:comments`);

        return res.status(200).send(comment);
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};