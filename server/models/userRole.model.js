module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {
        userId: {
            type: Sequelize.INTEGER
        },
        roleId: {
            type: Sequelize.INTEGER
        }, 

    });
    return UserRoles;
}
