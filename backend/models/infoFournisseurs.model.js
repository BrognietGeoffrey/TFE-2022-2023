// Module for the table fournisseurs from the database

module.exports = (sequelize, Sequelize) => {
    const fournisseurs = sequelize.define("fournisseurs", {
        fournisseur_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_fournisseur: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        adresse_fournisseur: {
            type: Sequelize.STRING
        },
        email_fournisseur: {
            type: Sequelize.STRING
        },
        telephone_fournisseur: {
            type: Sequelize.STRING
        },
        description : {
            type: Sequelize.STRING
        },


        
    });
    fournisseurs.associate = function(models) {
        fournisseurs.belongsTo(models.compteFournisseurs, {
            foreignKey: 'compte_fournisseur_id',
            as: 'compteFournisseurs'
        });
    };
    return fournisseurs;
}