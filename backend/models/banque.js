// model for the table banque

module.exports = (sequelize, Sequelize) => {
    const banque = sequelize.define("banque", {
        banque_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        banque_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        banque_email: {
            type: Sequelize.STRING
        },
        banque_phone: {
            type: Sequelize.STRING
        },
    


    });


    return banque;
}
