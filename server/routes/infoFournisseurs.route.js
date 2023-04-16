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

    app.get("/api/fournisseurs", controller.findAll);

    app.get("/api/fournisseurs/:id", controller.findOne);

    app.post("/api/fournisseurs", controller.create);

    app.put("/api/fournisseurs/:id", controller.update);

    app.delete("/api/fournisseurs/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.delete);

    }