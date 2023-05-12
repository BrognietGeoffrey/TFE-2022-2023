const env = process.env.NODE_ENV || 'development';
// dotenv
require('dotenv').config();
const config = require("../config/config.js")[env];
console.log(config, env, 'config' )
// import argon
const argon2 = require('argon2');


const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 1,

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
db.UserRoles = require('../models/userRole.model')(sequelize, Sequelize);
db.Comments = require('../models/comments.model')(sequelize, Sequelize);
// Facture_id is the foreign key in the facturier table
db.Facturiers.belongsTo(db.Factures, { foreignKey: 'facture_id' });

// compte_client_id is the foreign key in the facturier table
db.Facturiers.belongsTo(db.compteClients, { foreignKey: 'co_client_id' });
db.Facturiers.belongsTo(db.compteFournisseurs, { foreignKey: 'co_fournisseur_id' });
// Factures foreign key TVA
db.Factures.belongsTo(db.Tva, {foreignKey : 'tva_id'})
db.compteClients.belongsTo(db.Clients, {foreignKey : 'client_id', onDelete: 'cascade'})
db.Clients.hasMany(db.compteClients, {foreignKey : 'client_id', onDelete: 'cascade'})
db.compteFournisseurs.belongsTo(db.Fournisseurs, {foreignKey : 'fournisseur_id', onDelete: 'cascade'}) 
db.Fournisseurs.hasMany(db.compteFournisseurs, {foreignKey : 'fournisseur_id', onDelete: 'cascade'})
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
db.Logs.belongsTo(db.Factures, {foreignKey : 'facture_id'})
db.Logs.belongsTo(db.Extraits, {foreignKey : 'extrait_id'})
db.Logs.belongsTo(db.Tva, {foreignKey : 'tva_id'})
db.UserRoles.belongsTo(db.User, {foreignKey : 'userId'})
db.UserRoles.belongsTo(db.Role, {foreignKey : 'roleId'})
db.Comments.belongsTo(db.User, {foreignKey : 'userId'})
db.Comments.belongsTo(db.Facturiers, {foreignKey : 'facturier_id'})


// user est connecté à client_id
db.User.belongsTo(db.Clients, {foreignKey : 'client_id'})
db.User.belongsToMany(db.Role, { through: db.UserRoles, foreignKey: 'userId', otherKey: 'roleId' });
db.Role.belongsToMany(db.User, { through: db.UserRoles, foreignKey: 'roleId', otherKey: 'userId' });


// Réinitialiser la base de données si elle est vide ou si elle est modifiée et que le modèle a changé
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync Db');
    // initial();
});

const initial = () => {
    db.Role.create({
        id: 1,
        name: "user"
    });
    db.Role.create({
        id: 2,
        name: "moderator"
    });
    db.Role.create({
        id: 3,
        name: "admin"
    });

  };







// Roles are created automatically when the server starts not in the array
db.ROLES = ["user", "admin", "moderator"];
console.log("db.ROLES = " + db.ROLES);
module.exports = db;

