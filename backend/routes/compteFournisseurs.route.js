// Routes for compteFournisseurs

const controllers = require("../controllers/compteFournisseurs.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/compteFournisseurs", controllers.findAll);
    
    app.get("/api/compteFournisseurs/:id", controllers.findOne);
    
    app.post("/api/compteFournisseurs", controllers.create);
    
    app.put("/api/compteFournisseurs/:id", controllers.update);
    
    app.delete("/api/compteFournisseurs/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);
    
    }