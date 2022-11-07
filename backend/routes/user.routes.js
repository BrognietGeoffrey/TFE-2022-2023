const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.accessPublic);

  app.get(
    "/api/test/user",
    [authJwt.tokenVerification],
    controller.accessUser
  );

  app.get(
    "/api/test/mod",
    [authJwt.tokenVerification, authJwt.verifyIsModeratorRole],
    controller.accessModerator
  );

  app.get(
    "/api/test/admin",
    [authJwt.tokenVerification, authJwt.verifyIsAdminRole],
    controller.accessAdmin
  );
};