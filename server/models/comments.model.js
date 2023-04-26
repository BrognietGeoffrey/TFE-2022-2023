module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        comment_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments : {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id : {
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