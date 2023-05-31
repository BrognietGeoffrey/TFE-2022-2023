// controllers for compteFournisseurs


const db = require('../models');
const Op = db.Sequelize.Op;
const { compteFournisseurs } = require('../models');

// Create and Save a new CompteFournisseur
const createCompteFournisseur = (req, res) => {
    // Validate request
    if (!req.body.numCompteFournisseur) {
        res.status(409).send({
        message: "Le numéro de compte fournisseur ne peut pas être vide."
        });
        return;
    }
    
    // Create a CompteFournisseur
    const compteFournisseur = {
        numCompteFournisseur : req.body.numCompteFournisseur,
        num_compte_banque : req.body.num_compte_banque,
        fournisseur_id : req.body.fournisseur_id
    };
    
    // Save CompteFournisseur in the database
    compteFournisseurs.create(compteFournisseur)
        .then(data => {
        res.send({
            message: "Le compte fournisseur a été créé avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la création du compte fournisseur."
        });
        });

    }

// Retrieve all CompteFournisseurs from the database.
const findAllCompteFournisseur = (req, res) => {
    const numCompteFournisseur = req.query.numCompteFournisseur;
    var condition = numCompteFournisseur ? { numCompteFournisseur: { [Op.like]: `%${numCompteFournisseur}%` } } : null;
    
    compteFournisseurs.findAll({ where: condition })
        .then(data => {
        res.send({
            message: "Liste des comptes fournisseurs retrouvés avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la recherche des comptes fournisseurs."
        });
        });
    }

// Find a single CompteFournisseur with an id
const findOneCompteFournisseur = (req, res) => {
    const id = req.params.id;
    
    compteFournisseurs.findByPk(id)
        .then(data => {
        res.send({
            message: "Compte fournisseur retrouvé avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la recherche du compte fournisseur avec l'id=" + id
        });
        });
    }
// Update a CompteFournisseur by the id in the request
const updateCompteFournisseur = (req, res) => {
    const id = req.params.id;
    
    compteFournisseurs.update(req.body, {
        where: { compte_fournisseur_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le compte fournisseur a été mis à jour avec succès."
            });
        } else {
            res.status(409).send({
            message: `Impossible de mettre à jour le compte fournisseur avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la mise à jour du compte fournisseur avec l'id=" + id
        });
        });
    }

// Delete a CompteFournisseur with the specified id in the request
const deleteCompteFournisseur = (req, res) => {
    const id = req.params.compte_fournisseur_id;
    
    compteFournisseurs.destroy({
        where: { co_fournisseur_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le compte fournisseur a été supprimé avec succès!"
            });
        } else {
            res.status(409).send({
            message: `Impossible de supprimer le compte fournisseur avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Impossible de supprimer le compte fournisseur avec l'id=" + id
        });
        });
    }

module.exports = {
    createCompteFournisseur,
    findAllCompteFournisseur,
    findOneCompteFournisseur,
    updateCompteFournisseur,
    deleteCompteFournisseur
}
