// model for the decompte table

module.exports = (sequelize, Sequelize) => {
    const decompte = sequelize.define("decomptes", {
        decompte_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        num_decompte: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        type   : {   
            type: Sequelize.STRING
        }
    });
  
    return decompte;
}