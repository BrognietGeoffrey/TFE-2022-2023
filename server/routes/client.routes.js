// Route for client with controllers and models

const controllers = require('../controllers/client.controllers');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/clients", controllers.findAll);

    app.get("/api/clients/:id", controllers.findOne);

    app.post("/api/clients", controllers.create);

    app.put("/api/clients/:id", controllers.update);

    app.delete("/api/clients/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);

    }
