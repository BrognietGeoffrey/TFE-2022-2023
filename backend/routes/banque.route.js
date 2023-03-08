// route for banque
// app.get('/banque', db.getBanque)

const controller = require("../controllers/banque.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/banque", controller.findAll);
    
    app.get("/api/banque/:id", controller.findOne);
    
    app.post("/api/banque", controller.create);
    
    app.put("/api/banque/:id", controller.update);
    
    app.delete("/api/banque/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.delete);
    
    }