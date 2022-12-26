

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
  
    return factureObjet;
}