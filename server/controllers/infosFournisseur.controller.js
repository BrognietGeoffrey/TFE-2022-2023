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
            "Malheureusement, une erreur s'est produite lors de la récupération des fournisseurs."
        });
        });
    }

// Get a single fournisseur by id
const findOneFournisseur = (req, res) => {
    const id = req.params.id;

    Fournisseurs.findByPk(id)
        .then(data => {
        res.send({
            message: "Fournisseur récupéré avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la récupération du fournisseur avec l'id=" + id
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
            message: "Le nom du fournisseur est déjà utilisé."
        });
        return;
        } else {
        // Create a fournisseur
        const fournisseur = {
            name: req.body.name,
            adresse_fournisseur: req.body.adresse_fournisseur,
            telephone_fournisseur: req.body.telephone_fournisseur,
            email_fournisseur: req.body.email_fournisseur,
            description : req.body.description, 
            num_fournisseur : req.body.num_fournisseur,
        };
        
        // Save fournisseur in the database
        Fournisseurs.create(fournisseur)
            .then(data => {
            res.send({
                message: "Le fournisseur a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                "Malheureusement, une erreur s'est produite lors de la création du fournisseur."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            "Malheureusement, une erreur s'est produite lors de la création du fournisseur."
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
            message: "Le fournisseur a été mis à jour avec succès."
        });
        } else {
        res.status(409).send({
            message: `Impossible de mettre à jour le fournisseur avec l'id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Erreur lors de la mise à jour du fournisseur avec l'id=" + id
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
            message: "Le fournisseur a été supprimé avec succès !"
            });
        } else {
            res.status(409).send({
            message: `Impossible de supprimer le fournisseur avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la suppression du fournisseur avec l'id=" + id
        });
        });
    }

const getFournisseurByName = (req, res) => {
    const name = req.params.name;

    Fournisseurs.findOne({
        where: {
        name: name
        }
    })
    .then(data => {
        if (!data) {
        res.status(409).send({
            message: "Aucun fournisseur trouvé avec le nom=" + name
        });
        } else {
        res.send({
            message: "Fournisseur récupéré avec succès.",
            data : data
        });
        }
    })
    .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la récupération du fournisseur avec le nom=" + name
        });
    });
    }
    



module.exports = {
    findAllFournisseur,
    findOneFournisseur,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur, 
    getFournisseurByName
}

