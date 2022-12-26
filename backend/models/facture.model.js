module.exports
= (sequelize, Sequelize) => {
    const Factures = sequelize.define("factures", {
        facture_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        num_facture: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        facture_date: {
            type: Sequelize.DATE
        },
        montant: {
            type: Sequelize.INTEGER
        },
        estpaye : {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        objet_id : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        libelle_id : {
            type: Sequelize.INTEGER,
            allowNull: false
        },


    
    });

    return Factures;

}

