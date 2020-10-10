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

    app.get('/api/comments', controller.getComments)

    app.patch("/api/comments/:commentId/like",
        [
            commentMiddleware.checkIfCommentExists,
            userMiddleware.checkIfUserExists,
            commentMiddleware.checkIfUserAlreadyReactedToComment,
        ],
        controller.giveLikeToComment);

    app.patch("/api/comments/:commentId/not-like",
        [
            commentMiddleware.checkIfCommentExists,
            userMiddleware.checkIfUserExists,
            commentMiddleware.checkIfUserAlreadyReactedToComment,
        ],
        controller.giveNotLikeToComment);
};