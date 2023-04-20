// Controller for the fournisseur for the routes 

const db = require("../models");
const Op = db.Sequelize.Op;
const { Fournisseurs } = require("../models");

// Get all the fournisseurs
const findAllFournisseur = (req, res) => {
    Fournisseurs.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while retrieving fournisseurs."
        });
        });
    }

// Get a single fournisseur by id
const findOneFournisseur = (req, res) => {
    const id = req.params.id;

    Fournisseurs.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(409).send({
            message: "Error retrieving fournisseur with id=" + id
        });
        });
    }

const createFournisseur = (req, res) => {
    // If the name_fournisseur is already in the database, return an error
    Fournisseurs.findOne({
        where: {
        name: req.body.name
        }
    })

    .then(data => {
        if (data) {
        res.status(409).send({
            message: "This fournisseur already exists"
        });
        return;
        } else {
        // Create a fournisseur
        const fournisseur = {
            name: req.body.name,
            adresse_fournisseur: req.body.adresse_fournisseur,
            telephone_fournisseur: req.body.telephone_fournisseur,
            email_fournisseur: req.body.email_fournisseur,
            description : req.body.description
        };
        
        // Save fournisseur in the database
        Fournisseurs.create(fournisseur)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the fournisseur."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the fournisseur."
        });
    });
    }

// Update a fournisseur by the id in the request
const updateFournisseur = (req, res) => {
    const id = req.params.id;

    Fournisseurs.update(req.body, {
        where: { fournisseur_id: id }
    })
    // Si le name est déjà dans la base de données, retourner une erreur
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
        res.status(409).send({
        message: "Error updating fournisseur with id=" + id
        });
    });
}

// Delete a fournisseur with the specified id in the request
const deleteFournisseur = (req, res) => {
    const id = req.params.id;

    Fournisseurs.destroy({
        where: { fournisseur_id: id }
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

module.exports = {
    findAllFournisseur,
    findOneFournisseur,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur
}

