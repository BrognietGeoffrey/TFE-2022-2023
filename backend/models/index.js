

const { Sequelize } = require('sequelize');
const keys = require('../config/db.config');

const sequelize = new Sequelize(keys.database, keys.username, keys.password, {
  host: keys.pgHost,
  dialect: keys.dialect,
  operatorsAliases: 0,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: keys.pool.max,
    min: keys.pool.min,
    acquire: keys.pool.acquire,
    idle: keys.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Facturiers = require('../models/facturier.model')(sequelize, Sequelize);
db.Factures = require('../models/facture.model')(sequelize, Sequelize);
db.compteClients = require('../models/compteClient.model')(sequelize, Sequelize);
db.compteFournisseurs = require('../models/compteFournisseur')(sequelize, Sequelize);
db.Decomptes = require('../models/decompte.model')(sequelize, Sequelize);
db.Extraits = require('../models/extrait.model')(sequelize, Sequelize);
db.Clients = require('../models/client.model')(sequelize, Sequelize);
db.Fournisseurs = require('../models/infoFournisseurs.model')(sequelize, Sequelize);
db.Objets = require('../models/factureObjet.model')(sequelize, Sequelize);
db.Libelles = require('../models/factureLibelle.model')(sequelize, Sequelize);
db.Tva = require('../models/tva.model')(sequelize, Sequelize);
db.User = require('../models/user.model')(sequelize, Sequelize);
db.Role = require('../models/role.model')(sequelize, Sequelize);
db.Logs = require('../models/logs.model')(sequelize, Sequelize);
// Facture_id is the foreign key in the facturier table
db.Facturiers.belongsTo(db.Factures, { foreignKey: 'facture_id' });

// compte_client_id is the foreign key in the facturier table
db.Facturiers.belongsTo(db.compteClients, { foreignKey: 'co_client_id' });
db.Facturiers.belongsTo(db.compteFournisseurs, { foreignKey: 'co_client_id' });
// Factures foreign key TVA
db.Factures.belongsTo(db.Tva, {foreignKey : 'tva_id'})
db.compteClients.belongsTo(db.Clients, {foreignKey : 'client_id'})
db.compteFournisseurs.belongsTo(db.Fournisseurs, {foreignKey : 'fournisseur_id'})
db.Facturiers.belongsTo(db.Decomptes, {foreignKey : 'decompte_id'})
db.Factures.belongsTo(db.Objets, {foreignKey : 'objet_id'})
db.Factures.belongsTo(db.Libelles, {foreignKey : 'libelle_id'})
db.Facturiers.belongsTo(db.Extraits, {foreignKey : 'extrait_id'})
db.Logs.belongsTo(db.User, {foreignKey : 'user_id'})
db.Logs.belongsTo(db.Facturiers, {foreignKey : 'facturier_id'})
db.Logs.belongsTo(db.Clients, {foreignKey : 'client_id'})
db.Logs.belongsTo(db.Fournisseurs, {foreignKey : 'fournisseur_id'})
db.Logs.belongsTo(db.Objets, {foreignKey : 'objet_id'})
db.Logs.belongsTo(db.Libelles, {foreignKey : 'libelle_id'})
db.Logs.belongsTo(db.Decomptes, {foreignKey : 'decompte_id'})
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
module.exports = db;

