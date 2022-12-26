// Middleware pour les factures

const db = require("../models");
const Facture = db.facture;
const Op = db.Sequelize.Op;

// Create and Save a new Facture
exports.create = (req, res) => {
    // Validate request
    if (!req.body.num_facture) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Facture
    const facture = {
        num_facture: req.body.num_facture,
        facture_date: req.body.facture_date,
        montant: req.body.montant,
        description: req.body.description,
        estpaye: req.body.estpaye,
        objet_id: req.body.objet_id,
        libelle_id: req.body.libelle_id
    };
    
    // Save Facture in the database
    Facture.create(facture)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the Facture."
        });
        });
    }

// Retrieve all Factures from the database.
exports.findAll = (req, res) => {
    const num_facture = req.query.num_facture;
    var condition = num_facture ? { num_facture: { [Op.like]: `%${num_facture}%` } } : null;
    
    Facture.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving factures."
        });
        });
    }

// Find a single Facture with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Facture.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving Facture with id=" + id
        });
        });
    }

    

// Update a Facture by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    Facture.update(req.body, {
        where: { facture_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Facture was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Facture with id=${id}. Maybe Facture was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Facture with id=" + id
        });
        });
    }

// Delete a Facture with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Facture.destroy({
        where: { facture_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Facture was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Facture with id=${id}. Maybe Facture was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Facture with id=" + id
        });
        });
    }



