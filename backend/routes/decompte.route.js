// route for the decompte
const controllers = require("../controllers/decompte.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/decomptes", controllers.findAll);
    
    app.get("/api/decomptes/:id", controllers.findOne);
    
    app.post("/api/decomptes", controllers.create);
    
    app.put("/api/decomptes/:id", controllers.update);
    
    app.delete("/api/decomptes/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controllers.delete);
    
    }