// Model for the extrait table

module.exports = (sequelize, Sequelize) => {
    const extrait = sequelize.define("extraits", {
        extrait_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_extrait: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        montant: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        num_extrait: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description : {
            type: Sequelize.STRING
        },
        
        // The fournissuer_id is link to compte_fournisseur_id in the table compte_fournisseurs
       

        
    });
  
    return extrait;
}