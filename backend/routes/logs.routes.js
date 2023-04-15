const controller = require("../controllers/logs.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/logs", controller.findAll);
    app.post("/api/logs", controller.create);



    }
// Path: TFE-2022-2023/backend/routes/logs.routes.js