module.exports = (sequelize, Sequelize) => {
    const factureLibelle = sequelize.define("libelles", {
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
    factureLibelle.associate = function(models) {
        factureLibelle.belongsTo(models.factures, {
            foreignKey: 'libelle_id',
            as: 'factures'
        });
    };

    return factureLibelle;
}