const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

// get JWT secret key from .env file
const secretKey = process.env.JWT_SECRET_KEY;
const {User, Role, UserRoles} = require('../models');
const { secret } = require('../config/auth.config');



const tokenVerification = (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } 
    if (!token) {
       return res.status(401).json({ error: 'token missing' })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (ex) {
      return res.status(400).json({ error: 'token invalid' })
    }
  };

const verifyAccess = async() => {
    try{
        const token = req.headers('Authorization').split("Bearer ")[1].trim();
        console.log(token, "token");
        return jwt.verify(token, secretKey)
    }catch(e){
        return null
    }
}


// Function qui vérifie si l'utilisateur est un admin, un moderateur ou un user en paramètre. Et selon le paramètre, on retourne un message d'erreur ou non.
const verifyIsAdminRole = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        UserRoles.findOne({
            where: {
                userId: user.id
            }
        }).then(userRole => {
            Role.findByPk(userRole.roleId).then(role => {
                console.log(role, "role");
                if (role.name === "admin") {
                    next();
                    return;
                }
                res.status(403).send({
                    message: "Vous devez être admin pour accéder à cette ressource."
                });
                return;
            });
        }
        );
    });
};

const verifyIsModeratorRole = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        UserRoles.findOne({
            where: {
                userId: user.id
            }
        }).then(userRole => {
            Role.findByPk(userRole.roleId).then(role => {
                console.log(role, "role");
                if (role.name === "moderator") {
                    next();
                    return;
                }
                res.status(403).send({
                    message: "Vous devez modérateur pour accéder à cette ressource."
                });
                return;
            });
        }
        );
    });
};

const verifyIsAdminOrModeratorRole = (req, res, next) => {
    // find with decoded id
    User.findByPk(req.userId).then(user => {
        console.log(user, "user");
        UserRoles.findOne({
            where: {
                userId: user.userId
            }
        }).then(userRole => {
            Role.findByPk(userRole.roleId).then(role => {
                console.log(role, "role");
                if (role.name === "admin" || role.name === "moderator") {
                    next();
                    return;
                }
                res.status(403).send({
                    message: "Vous devez être admin ou modérateur pour accéder à cette ressource."
                });
                return;
            });
        }
        );
    }
    );
};

module.exports = {
    tokenVerification,
    verifyAccess,
    verifyIsAdminRole,
    verifyIsModeratorRole,
    verifyIsAdminOrModeratorRole
};
