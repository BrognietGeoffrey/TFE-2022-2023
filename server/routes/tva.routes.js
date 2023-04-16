// routes for TVA

const controller = require("../controllers/tva.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/tva", controller.findAll);
    
    app.get("/api/tva/:id", controller.findOne);

    app.post("/api/tva", controller.create);
    

    
    }