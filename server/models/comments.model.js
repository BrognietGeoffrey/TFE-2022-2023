module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        comment_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments : {
            type: Sequelize.STRING,
            // longueur maximale du champ
            len: [0, 500],
            allowNull: false
        },
        title : {
            type: Sequelize.STRING,
            // longueur maximale du champ
            len: [0, 50],
            allowNull: false
        },
        userId : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        facturier_id : {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });
    return Comments;
}