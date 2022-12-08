// All routes for the fournisseur

const controller = require("../controllers/infosFournisseur.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/infosFournisseurs", controller.findAll);

    app.get("/api/infosFournisseurs/:id", controller.findOne);

    app.post("/api/infosFournisseurs", controller.create);

    app.put("/api/infosFournisseurs/:id", controller.update);

    app.delete("/api/infosFournisseurs/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.delete);

    }