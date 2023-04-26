const { Factures } = require(".");

// Table de base données qui reprends les données que rajoute l'utilisateur
module.exports = (sequelize, Sequelize) => {
    const Logs = sequelize.define("logs", {
        log_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        facturier_id : {
            type: Sequelize.INTEGER,
            allowNull: true,
           
        },
        facture_id : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        fournisseur_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        client_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        libelle_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        objet_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        decompte_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        extrait_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description : {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        tva_id : {
            type: Sequelize.INTEGER,
            allowNull: true
        },

    });
    return Logs;
}