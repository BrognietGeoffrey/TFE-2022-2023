const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



// Roles are created automatically when the server starts not in the array
db.ROLES = ["user", "admin", "moderator"];
console.log("db.ROLES = " + db.ROLES);

db.facture = require("../models/facture.model.js")(sequelize, Sequelize);
db.compteFournisseur = require("../models/compteFournisseur.js")(sequelize, Sequelize);
db.banque = require("../models/banque.js")(sequelize, Sequelize);
db.fournisseurs = require("../models/infoFournisseurs.model.js")(sequelize, Sequelize);
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.compteClient = require("../models/compteClient.model.js")(sequelize, Sequelize);
db.extraits = require("../models/extrait.model.js")(sequelize, Sequelize);
db.decompte = require("../models/decompte.model.js")(sequelize, Sequelize);
db.facturier = require("../models/facturier.model.js")(sequelize, Sequelize);
db.objet = require("../models/factureObjet.model.js")(sequelize, Sequelize);
db.libelle = require("../models/factureLibelle.model.js")(sequelize, Sequelize);
db.tva = require("../models/tva.model.js")(sequelize, Sequelize);

module.exports = db