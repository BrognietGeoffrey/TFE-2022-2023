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
        montantfacture: {
            type: Sequelize.INTEGER
        },
        description : {
            type: Sequelize.STRING
        },
        estpaye : {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    
    });
    return Factures;
}

