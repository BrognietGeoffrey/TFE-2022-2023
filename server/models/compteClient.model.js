// model for compteClient
'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const compteClients = sequelize.define("compte_clients", {
        co_client_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numCompteClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        num_compte_banque : {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
        description   : {   
            type: DataTypes.STRING
        },

    }
    );

    
    return compteClients;
};


    



        
    

