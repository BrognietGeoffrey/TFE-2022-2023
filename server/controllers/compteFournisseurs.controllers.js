// controllers for compteFournisseurs


const db = require('../models');
const Op = db.Sequelize.Op;
const { compteFournisseurs } = require('../models');

// Create and Save a new CompteFournisseur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numCompteFournisseur) {
        res.status(409).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a CompteFournisseur
    const compteFournisseur = {
        numCompteFournisseur : req.body.numCompteFournisseur,
        banque_id : req.body.banque_id,
        fournisseur_id : req.body.fournisseur_id
    };
    
    // Save CompteFournisseur in the database
    compteFournisseurs.create(compteFournisseur)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the CompteFournisseur."
        });
        });

    }

// Retrieve all CompteFournisseurs from the database.
exports.findAll = (req, res) => {
    const numCompteFournisseur = req.query.numCompteFournisseur;
    var condition = numCompteFournisseur ? { numCompteFournisseur: { [Op.like]: `%${numCompteFournisseur}%` } } : null;
    
    compteFournisseurs.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving compteFournisseurs."
        });
        });
    }

// Find a single CompteFournisseur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    compteFournisseurs.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.send({
            message: "Error retrieving Facture with id=" + id
        });
        });
        console.log("CompteFournisseur with id=" + id)
    }
// Update a CompteFournisseur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    compteFournisseurs.update(req.body, {
        where: { compte_fournisseur_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "CompteFournisseur was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update CompteFournisseur with id=${id}. Maybe CompteFournisseur was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating CompteFournisseur with id=" + id
        });
        });
    }

// Delete a CompteFournisseur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.compte_fournisseur_id;
    
    compteFournisseurs.destroy({
        where: { compte_fournisseur_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "CompteFournisseur was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete CompteFournisseur with id=${id}. Maybe CompteFournisseur was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete CompteFournisseur with id=" + id
        });
        });
    }
