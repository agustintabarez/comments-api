const controller = require("../controllers/comment.controller");
const {userMiddleware, commentMiddleware} = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/comments",
        [
            commentMiddleware.checkIfCommentTextIsValid,
            userMiddleware.checkIfUserExists
        ],
        controller.addComment);

    app.get('/api/comments/:commentId',
        [
            commentMiddleware.checkIfCommentExists
        ],
        controller.getComment)
};