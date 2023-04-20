const {UserRoles, Role, User} = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const users = await UserRoles.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Role,
                }
            ]
        });
        res.send(users);
    } catch (err) {
        res.status(200).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
}

const getUserByUsername = async (req, res, username) => {
   
    try {
        const user = await User.findOne({
            where: {username: username},
        });
        // Après avoir récupéré l'utilisateur, on récupère son role via la table UserRoles
        const userRole = await UserRoles.findOne({
            where: {
                userId: user.id
            }
        });
        // On récupère le role de l'utilisateur
        const role = await Role.findByPk(userRole.roleId);
        // On renvoie l'utilisateur et son role
        res.send({user, role});
    } catch (err) {
        res.status(200).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername
}
