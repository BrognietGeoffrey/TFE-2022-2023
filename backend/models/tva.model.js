// table for the tva 
module.exports = (sequelize, Sequelize) => {
    const tva = sequelize.define("tva", {
        tva_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tva_value: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        tva_description : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    });
    return tva;
}

