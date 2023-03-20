// model for compteClient

module.exports = (sequelize, Sequelize) => {
    const compteClients = sequelize.define("compte_clients", {
        compte_client_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numCompteClient: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        client_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'clients',
                key: 'client_id'
            }
        },
      
        description   : {   
            type: Sequelize.STRING
        },
        
        // The client_id is link to compte_client_id in the table compte_clients
        // The banque_id is link to banque_id in the table banque

        
    });
    
    return compteClients;
}