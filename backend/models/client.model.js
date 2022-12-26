// model for the table clients 

module.exports = (sequelize, Sequelize) => {
    const clients = sequelize.define("clients", {
        client_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        firstname : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        adresse_client: {
            type: Sequelize.STRING
        },
        email_client: {
            type: Sequelize.STRING
        },
        telephone_client: {
            type: Sequelize.STRING
        },
        description : {
            type: Sequelize.STRING
        },

        
    });
    clients.associate = function(models) {
        clients.belongsTo(models.compteClient, {
            foreignKey: 'compte_client_id',
            as: 'compteClient'
        });
    };
    return clients;
}