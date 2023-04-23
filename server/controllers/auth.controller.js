const db = require("../models");
const config = require("../config/auth.config");
const {UserRoles, Role, User} = require('../models');
const argon2 = require('argon2');
const secretKey = 'dev/env_dev'


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword.toString()
  })
  
    .then(user => {
      
      if (req.body.roles) {
        
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
              
            }
            
          }
          
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      


      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  try {
    const {username, password} = req.body;

    // Trouver l'user via son username avec l'adresse api/users?username=${username}
    const user = await User.findOne({
      where: {username: username},
    });

    // Trouver son role via son id
    const userRole = await UserRoles.findOne({
      where: {
        userId: user.id
      }, 
      include: [
        {
          model: Role,
        }, 
        {
          model: User,
        }

      ]
   
    });
    console.log(userRole.role.dataValues, "userRole");
    if (!user) {
      return res.status(404).send('User Not Found.');
    }

    const passwordHash = user.dataValues['password'].trim();
    
    const validPassword = await argon2.verify(passwordHash, password);

    if (!validPassword) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign(
      { user_id: user.dataValues, role: userRole.role.dataValues.name, userInfo : userRole },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    console.log(token, "token, login");
    

    res.header('Authorization', token).json({
      error: null,
      data: {token :token, user: user.dataValues, role: userRole.role.dataValues.name},
      info : userRole
    })
    // return res et les informations de l'user


    return res

  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message);
  }
}






// exports.signin = async (req, res) => {
//   try {
//     const {username, password} = req.body;

//     const user = await User.findOne({
//       where: {
//         username: username
//       }
//     });

//     if (!user) {
//       return res.status(404).send('User Not Found.');
//     }

//     const validPassword = await argon2.verify(user.password, password);

//     if (!validPassword) {
//       return res.status(401).send({
//         accessToken: null,
//         message: "Invalid Password!"
//       });
//     }

//     const role = await user.getRoles();
//     const dataRole = JSON.stringify(role);

//     const token = jwt.sign(
//       { user_id: user.dataValues, role: role, username: user.dataValues.username, email: user.dataValues.email },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );

  

//   res.header('Authorization', token).json({
//       error: null,
//       data: {token :token, user: user.dataValues, role: role}
//   })

//   return res + token; 

//   //return res.status(404).send('Invalid Credentials');
// } catch (error) {
//   console.log(error)
//   return res.status(500).send(error.message);
// }
// }