const {UserRoles, Role, User, Clients} = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const users = await UserRoles.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Role,
                }, 

            ]
        });
        res.send({
            message: "Les utilisateurs ont été récupérés avec succès.",
            data: users
        });
    } catch (err) {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la récupération des utilisateurs."
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
        res.send(
            {
                message: "L'utilisateur a été récupéré avec succès.",
                data: {
                    user: user,
                    role: role
            } 
        });
    } catch (err) {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la récupération de l'utilisateur."
        });
    }
}

const getUserAndClient = async (req, res) => {
    try {
        const user = await User.findAll({
            include: [
                {
                    model: Clients,
                }
            ]
        });
        res.send({
            message: "Les utilisateurs ont été récupérés avec succès.",
            data: user
        });
    } catch (err) {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la récupération des utilisateurs."
        });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const {username, email, password, clientId} = req.body;
    try {
        const user = await User.update({
            username: username,
            email: email,
            password: password,
            clientId: clientId
        }, {
            where: {id: id}
        });
        res.send({
            message: "L'utilisateur a été mis à jour avec succès.",
            data: user
        });
    } catch (err) {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la mise à jour de l'utilisateur."
        });
    }
}



module.exports = {
    getAllUsers,
    getUserByUsername, 
    getUserAndClient, 
    updateUser
}

