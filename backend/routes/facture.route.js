const controller = require("../controllers/facture.controller");
const { authJwt } = require("../middleware");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/factures", controller.findAll);
    
    app.get("/api/factures/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.findOne);
    
    app.post("/api/factures", controller.create);
    
    app.put("/api/factures/:id", controller.update);
    
    app.delete("/api/factures/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.delete);
    
    };
