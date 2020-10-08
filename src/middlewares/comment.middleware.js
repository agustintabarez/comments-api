
checkIfCommentTextIsValid = async function (req, res, next) {

    if (!req.body.hasOwnProperty('text') || req.body.text === null) {

        return res.status(400).send({message: "Text can not be empty"});
    }

    if (req.body.text.length > 255) {

        return res.status(400).send({message: "Text is too big"});
    }

    next();
};

const userMiddleware = {
    checkIfCommentTextIsValid
};

module.exports = userMiddleware;