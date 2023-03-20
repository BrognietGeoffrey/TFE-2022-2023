

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
db.compteClients = require('../models/compteClient.model')(sequelize, Sequelize);
db.compteFournisseurs = require('../models/compteFournisseur')(sequelize, Sequelize);
db.Decomptes = require('../models/decompte.model')(sequelize, Sequelize);
db.Extraits = require('../models/extrait.model')(sequelize, Sequelize);
db.Clients = require('../models/client.model')(sequelize, Sequelize);
db.Fournisseurs = require('../models/infoFournisseurs.model')(sequelize, Sequelize);
db.Objets = require('../models/factureObjet.model')(sequelize, Sequelize);
db.Libelles = require('../models/factureLibelle.model')(sequelize, Sequelize);
db.Tva = require('../models/tva.model')(sequelize, Sequelize);


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


module.exports = db;

