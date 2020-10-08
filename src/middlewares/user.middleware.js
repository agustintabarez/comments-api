const db = require("../models");
const UserModel = db.user;

checkIfEmailIsAlreadyInUse = async function (req, res, next) {

    if (!req.body.hasOwnProperty('email') || req.body.email === null) {

        return res.status(400).send({message: "Email can not be empty"});
    }

    const user = await UserModel.findOne({'email': req.body.email});

    if (user instanceof UserModel) {

        return res.status(409).send({message: "Email already in use!"});
    }

    next();
};

checkIfUserExists = async function (req, res, next) {

    if (!req.body.hasOwnProperty('email') || req.body.email === null) {

        return res.status(400).send({message: "Email must be sent"});
    }

    const user = await UserModel.findOne({'email': req.body.email});

    if (user === null) {

        return res.status(404).send({message: "User not found"});
    }

    next();
};

const userMiddleware = {
    checkIfEmailIsAlreadyInUse,
    checkIfUserExists
};

module.exports = userMiddleware;