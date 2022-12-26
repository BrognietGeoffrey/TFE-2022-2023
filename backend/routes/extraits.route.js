// Routes for extraits
const controllers = require("../controllers/extrait.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/extraits", controllers.findAll);
    
    app.get("/api/extraits/:id", controllers.findOne);
    
    app.post("/api/extraits", controllers.create);
    
    app.put("/api/extraits/:id", controllers.update);
    
    app.delete("/api/extraits/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);
    
    }