

const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Facturiers = require('../models/facturier.model')(sequelize, Sequelize);
db.Factures = require('../models/facture.model')(sequelize, Sequelize);
db.CoClients = require('../models/compteCLient.model')(sequelize, Sequelize);
db.CoFournisseurs = require('../models/compteFournisseur')(sequelize, Sequelize);
db.Decomptes = require('../models/decompte.model')(sequelize, Sequelize);
db.Extraits = require('../models/extrait.model')(sequelize, Sequelize);
db.Clients = require('../models/client.model')(sequelize, Sequelize);
db.Fournisseurs = require('../models/infoFournisseurs.model')(sequelize, Sequelize);
db.Objets = require('../models/factureObjet.model')(sequelize, Sequelize);
db.Libelles = require('../models/factureLibelle.model')(sequelize, Sequelize);
db.Tva = require('../models/tva.model')(sequelize, Sequelize);


// Facture_id is the foreign key in the facturier table
db.Facturiers.belongsTo(db.Factures, { foreignKey: 'facture_id' });
db.Facturiers.belongsTo(db.CoClients, { foreignKey: 'co_client_id' });
db.Facturiers.belongsTo(db.CoFournisseurs, { foreignKey: 'co_fournisseur_id' });



module.exports = db;

// const config = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: config.dialect,
//     operatorsAliases: false,

//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
// );

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.user = require("../models/user.model.js")(sequelize, Sequelize);
// db.role = require("../models/role.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// // Roles are created automatically when the server starts not in the array
// db.ROLES = ["user", "admin", "moderator"];
// console.log("db.ROLES = " + db.ROLES);

// const models = {
//   Factures: sequelize.import('../models/facture.model.js'),
//   Facturiers: sequelize.import('../models/facturier.model.js'),
//   CompteFournisseurs: sequelize.import('../models/compteFournisseur.js'),
//   Banques: sequelize.import('../models/banque.js'),
//   InfoFournisseurs: sequelize.import('../models/infoFournisseurs.model.js'),
//   Clients: sequelize.import('../models/client.model.js'),
//   CompteClients: sequelize.import('../models/compteClient.model.js'),
//   Extraits: sequelize.import('../models/extrait.model.js'),
//   Decompte: sequelize.import('../models/decompte.model.js'),
//   FactureObjets: sequelize.import('../models/factureObjet.model.js'),
//   FactureLibelles: sequelize.import('../models/factureLibelle.model.js'),
//   TVA: sequelize.import('../models/tva.model.js')
// };

// Object.keys(models).forEach((modelName) => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// // Set up associations between models
// models.Factures.belongsTo(models.Facturiers, {
//   as: 'facturier',
//   foreignKey: 'facturier_id'
// });

// models.Factures.belongsTo(models.InfoFournisseurs, {
//   as: 'infoFournisseur',
//   foreignKey: 'info_fournisseur_id'
// });
// models.Factures.belongsTo(models.CompteFournisseurs, {
//   as: 'compteFournisseur',
//   foreignKey: 'compte_fournisseur_id'
// });
// models.Factures.belongsTo(models.Banques, {
//   as: 'banque',
//   foreignKey: 'banque_id'
// });

// models.Factures.belongsTo(models.Extraits, {
//   as: 'extrait',
//   foreignKey: 'extrait_id'
// });

// models.Factures.belongsTo(models.Decompte, {
//   as: 'decompte',
//   foreignKey: 'decompte_id'
// });

// models.Factures.belongsTo(models.Clients, {
//   as: 'client',
//   foreignKey: 'client_id'
// });


// module.exports = db