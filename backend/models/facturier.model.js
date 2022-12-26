// Model for facturier table who is link to all id of the other tables
//

module.exports = (sequelize, Sequelize) => {
    const facturier = sequelize.define("facturiers", {
        facturier_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        facture_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true,
            references: {
                model: 'factures',
                key: 'facture_id'
            }
        },
        co_client_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'compte_clients',
                key: 'compte_client_id'
            }
        },
        co_fournisseur_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'compte_fournisseurs',
                key: 'compte_fournisseur_id'
            }

        },
        decompte_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'decomptes',
                key: 'decompte_id'
            }
        },
        extrait_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'extraits',
                key: 'extrait_id'
            }
        },
        // The facture_id is link to facture_id in the table factures
        // The co_client_id is link to compte_client_id in the table compte_clients
        // The co_fournisseur_id is link to compte_fournisseur_id in the table compte_fournisseurs
        // The decompte_id is link to decompte_id in the table decomptes
        // The extrait_id is link to extrait_id in the table extraits

        
    });
    facturier.associate = function(models) {
        facturier.belongsTo(models.factures, {
            foreignKey: 'facture_id',
            as: 'factures'
        });
    };
    facturier.associate = function(models) {
        facturier.belongsTo(models.compte_clients, {
            foreignKey: 'co_client_id',
            as: 'compte_clients'
        });
    };
    facturier.associate = function(models) {
        facturier.belongsTo(models.compte_fournisseurs, {
            foreignKey: 'co_fournisseur_id',
            as: 'compte_fournisseurs'
        });
    };
    facturier.associate = function(models) {
        facturier.belongsTo(models.decomptes, {
            foreignKey: 'decompte_id',
            as: 'decomptes'
        });
    };
    facturier.associate = function(models) {
        facturier.belongsTo(models.extraits, {
            foreignKey: 'extrait_id',
            as: 'extraits'
        });
    };




  
    return facturier;
}