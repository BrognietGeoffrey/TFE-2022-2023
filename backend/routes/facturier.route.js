// Routes for facturiers

const controllers = require("../controllers/facturier.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/facturiers", controllers.findAll);
    
    app.get("/api/facturiers/:id", controllers.findOne);
    
    app.post("/api/facturiers", controllers.create);
    
    // app.put("/api/facturiers/:id", controllers.update);
    
    // app.delete("/api/facturiers/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);
    
    }