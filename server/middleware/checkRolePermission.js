const {UserRoles, Role} = require('../models');
const jwt = require('jsonwebtoken')
const {verifyAccess} = require('../middleware/jwtAuthentification')
const checkRoleAuth = (roles) => async(req, res, next) => {
    // get the userId
    console.log(req.headers, "req.headers checkrole");



    try {
        const token = req.header('Authorization').split("Bearer ")[1].trim();
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(tokenData, "tokenData");
        const userData = await UserRoles.findOne({
            where: { userId: tokenData.user_id.id}
        });
        console.log(userData, "userData");
        
        const roleData = await Role.findOne({
            where: { id: userData.roleId}
        });
        console.log(roleData, "roleData");
        if (roles.includes(roleData.name)) {
            next();
        } else {
            res.status(403).send({
                message: "Vous n'avez pas les droits pour accéder à cette ressource."
            });
        }
    } catch (error) {
        console.log(error, 'errir');
        res.status(500).send({
            message: "Erreur serveur"
        });
    }
}

module.exports = checkRoleAuth;