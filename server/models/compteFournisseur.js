// model for the table compte_fournisseurs
//

module.exports = (sequelize, Sequelize) => {
    const compteFournisseurs = sequelize.define("compte_fournisseurs", {

        compte_fournisseur_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numCompteFournisseur: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true
        },
        num_compte_banque : {
            type: Sequelize.STRING,
            allowNull: true,
        },
        fournisseur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
           
        },
 

        // The fournissuer_id is link to compte_fournisseur_id in the table compte_fournisseurs
       

        
    });
    // compteFournisseurs.associate = function(models) {
    //     compteFournisseurs.belongsTo(models.banque, {
    //         foreignKey: 'banque_id',
    //         as: 'banque'
    //     });
    // };



    // compteFournisseurs.associate = function(models) {
    //     compteFournisseurs.belongsTo(models.fournisseurs, {
    //         foreignKey: 'fournisseur_id',
    //         as: 'fournisseurs'
    //     });
    // };
    
    return compteFournisseurs;
}