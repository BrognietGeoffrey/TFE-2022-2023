// Routes for compteClients

const controllers = require("../controllers/compteClient.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/compteClients", controllers.findAll);
    
    app.get("/api/compteClients/:id", controllers.findOne);
    
    app.post("/api/compteClients", controllers.create);
    
    app.put("/api/compteClients/:id", controllers.update);
    
    app.delete("/api/compteClients/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);
    
    }