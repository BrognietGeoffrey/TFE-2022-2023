// controllers for banque 

const db = require('../models');
const Op = db.Sequelize.Op;
const Banque = db.banque;

// Create and Save a new Banque
exports.create = (req, res) => {
       // if the banque_name is already exist in the database, we will return the banque_name
    Banque.findOne({
        where: {
            banque_name: req.body.banque_name
        }
    })
    .then(ifbanque => {
        if (ifbanque) {
            res.status(200).send({
                message: "Banque already exist"
            });
            return;
        }
        // Create a Banque
        const banque = {
            banque_name: req.body.banque_name,
            banque_adresse: req.body.banque_adresse,
            banque_phone: req.body.banque_phone,
            banque_email: req.body.banque_email,
            
        };

        // Save Banque in the database
        Banque.create(banque)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the Banque."
            });
            });
        })
        .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the Banque."
            });
        });
    }


// Retrieve all Banques from the database.
exports.findAll = (req, res) => {

    
    const banque_name = req.query.banque_name;
    var condition = banque_name ? { banque_name: { [Op.like]: `%${banque_name}%` } } : null;

    Banque.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving banques."
        });
        });
    }


    exports.findOne = (req, res) => {
        const id = req.params.id;
        
        Banque.findByPk(id)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.send({
                message: "Error retrieving Banue with id=" + id
            });
            });
        }




// Update a Banque by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Banque.update (req.body, {
        where: { banque_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Banque was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Banque with id=${id}. Maybe Banque was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating Banque with id=" + id
        });
        });
    }

// Delete a Banque with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Banque.destroy({
        where: { banque_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Banque was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Banque with id=${id}. Maybe Banque was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete Banque with id=" + id
        });
        });
    }
