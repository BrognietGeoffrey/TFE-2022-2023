const controllers = require("../controllers/view.controllers");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.post("/api/view/createView", controllers.createCustomView);
    
    app.get("/api/view/getViews", controllers.getAllView);

    }