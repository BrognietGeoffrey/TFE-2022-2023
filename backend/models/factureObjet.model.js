

// model for the objet table

module.exports = (sequelize, Sequelize) => {
    const factureObjet = sequelize.define("objets", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    factureObjet.associate = function(models) {
        factureObjet.belongsTo(models.factures, {
            foreignKey: 'objet_id',
            as: 'factures'
        });
    };
    return factureObjet;
}