const db = require("../models");
const UserModel = db.user;

exports.signUp = async function (req, res) {

    try {

        const user = new UserModel({
            _id: req.body.email,
        });

        await user.save();

        return res.status(201).send({message: "User registered successfully!"});
    } catch (err) {

        res.status(500).send({message: err.message});
    }
};