const controllers = require("../controllers/facturedetails.controller");
const { authJwt } = require("../middleware");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/objet", controllers.findObjet);
    app.get("/api/libelle", controllers.findLibelle);

    app.get("/api/objet/:id", controllers.findObjetById);
    app.get("/api/libelle/:id", controllers.findLibelleById);

    app.post("/api/objet", controllers.createObjet);
    app.post("/api/libelle", controllers.createLibelle);



    
    }