'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Factures = sequelize.define('factures', {
    facture_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false, 
        unique: true, 
      
    },
    num_facture: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    num_facture_lamy: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    facture_date: {
        type: DataTypes.DATE
    },
    due_date: {
        type: DataTypes.DATE, 
        allowNull: true
    },
    montant: {
        type: DataTypes.INTEGER
    },
    estpaye : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    objet_id : {
        type: DataTypes.INTEGER,
        allowNull: true, 
       
    },
    libelle_id : {
        type: DataTypes.INTEGER,
        allowNull: true,
        
    },
    tva_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    
  }, {});

 



  return Factures;
};

