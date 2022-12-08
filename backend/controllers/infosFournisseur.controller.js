// Controller for the fournisseur for the routes 

const db = require("../models");
const Op = db.Sequelize.Op;
const Fournisseur = db.infoFournisseur;

// Get all the fournisseurs
exports.findAll = (req, res) => {
    Fournisseur.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving fournisseurs."
        });
        });
    }

// Get a single fournisseur by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Fournisseur.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving fournisseur with id=" + id
        });
        });
    }

// Create and Save a new fournisseur

exports.create = (req, res) => {
    // If the name_fournisseur is already in the database, return an error
    Fournisseur.findOne({
        where: {
        name_fournisseur: req.body.name_fournisseur
        }
    })

    .then(data => {
        if (data) {
        res.status(200).send({
            message: "This fournisseur already exists"
        });
        return;
        } else {
        // Create a fournisseur
        const fournisseur = {
            name_fournisseur: req.body.name_fournisseur,
            adresse_fournisseur: req.body.adresse_fournisseur,
            telephone_fournisseur: req.body.telephone_fournisseur,
            email_fournisseur: req.body.email_fournisseur,
            description : req.body.description
        };
        
        // Save fournisseur in the database
        Fournisseur.create(fournisseur)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the fournisseur."
            });
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the fournisseur."
        });
    });
    }

// Update a fournisseur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Fournisseur.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "fournisseur was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update fournisseur with id=${id}. Maybe fournisseur was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating fournisseur with id=" + id
        });
        });
    }

// Delete a fournisseur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Fournisseur.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "fournisseur was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete fournisseur with id=${id}. Maybe fournisseur was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete fournisseur with id=" + id
        });
        });
    }