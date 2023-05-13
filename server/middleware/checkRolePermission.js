const {UserRoles, Role} = require('../models');
const jwt = require('jsonwebtoken')
const {verifyAccess} = require('../middleware/jwtAuthentification')
const checkRoleAuth = (roles) => async(req, res, next) => {
    // get the userId



    try {
        const token = req.header('Authorization').split("Bearer ")[1].trim();
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userData = await UserRoles.findOne({
            where: { userId: tokenData.user_id.id}
        });
        
        const roleData = await Role.findOne({
            where: { id: userData.roleId}
        });
        if (roles.includes(roleData.name)) {
            next();
        } else {
            res.status(403).send({
                message: "Vous n'avez pas les droits pour accéder à cette ressource."
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erreur serveur"
        });
    }
}

module.exports = checkRoleAuth;