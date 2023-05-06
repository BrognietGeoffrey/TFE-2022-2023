module.exports
= (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }, 
        client_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }


    });
    return User;
}
