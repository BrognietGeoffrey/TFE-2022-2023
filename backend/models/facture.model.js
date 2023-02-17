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
            allowNull: false, 
            references: {
                model: 'objets',
                key: 'id'
            }
        },
        libelle_id : {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'libelles',
                key: 'id'
            }
        },

        

    
    });
    // The objet_id is link to objet_id in the table objets
        // The libelle_id is link to libelle_id in the table libelles

    Factures.associate = function(models) {
        Factures.belongsTo(models.objets, {
            foreignKey: 'objet_id',
            as: 'objets'
        });
    };
    Factures.associate = function(models) {
        Factures.belongsTo(models.libelles, {
            foreignKey: 'libelle_id',
            as: 'libelles'
        });
    };

    return Factures;

}

