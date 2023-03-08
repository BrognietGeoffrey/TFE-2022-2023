const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.ifUsernameOrEmailExists,
            verifySignUp.ifRolesExist
        ], 
            controller.signup
        
    );

    app.post("/api/auth/signin",
    controller.signin
    );
}

