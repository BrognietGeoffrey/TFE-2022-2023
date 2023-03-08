const controller = require("../controllers/facture.controller");
const { authJwt } = require("../middleware");
const db = require("../models");
const Facture = db.facture;

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/factures", controller.findAll);
    
    app.get("/api/factures/:id", controller.findOne);

        // Get the last facture ID
    app.get('/api/facture/lastId', (req, res) => {
        Facture.findOne({ order: [ [ 'facture_id', 'DESC' ]] })
          .then(facture => {
            res.send(facture.facture_id.toString());
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving last facture ID."
            });
          });
      });
  
    
    app.post("/api/factures", controller.create);
    
    app.put("/api/factures/:id", controller.update);
    
    app.delete("/api/factures/:id",[authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], controller.delete);
    
    };
