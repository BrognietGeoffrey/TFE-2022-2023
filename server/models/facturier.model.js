'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Facturiers = sequelize.define('facturiers', {
    facturier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      key: 'facturier_id'
    },
    co_client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    co_fournisseur_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    decompte_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    extrait_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // blob 
    facture_img : {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  }, {});

  return Facturiers
}






