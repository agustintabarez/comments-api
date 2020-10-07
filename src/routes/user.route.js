const controller = require("../controllers/user.controller");
const { userMiddleware } = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/user/sign-up",
        [
            userMiddleware.checkIfEmailIsAlreadyInUse
        ],
        controller.signUp);
};