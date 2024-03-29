// Controllers for extrait
const db = require("../models");
const Op = db.Sequelize.Op;
const { Extraits } = require("../models");
// Create and Save a new Extrait
const createExtrait = (req, res) => {
    // If the numExtrait is already in the database, return an error
    Extraits.findOne({
        where: {
        num_extrait: req.body.num_extrait
        }
    })

    .then(data => {
        if (data) {
        res.status(409).send({
            message: "L'extrait existe déjà."
        });
        return;
        } else {
        // Create a extrait
        const extrait = {
            num_extrait: req.body.num_extrait,
            date_extrait: req.body.date_extrait,
            montant: req.body.montant,
            description     : req.body.description,


        };

        // Save extrait in the database
        Extraits.create(extrait)
            .then(data => {
            res.send({
                message: "L'extrait a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Malheureusement, une erreur s'est produite lors de la création de l'extrait."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la création de l'extrait."
        });
    });
}

// Retrieve all extrait from the database.
const findAllExtrait = (req, res) => {
    Extraits.findAll()
        .then(data => {
        res.send({
            message: "Liste des extraits récupérée avec succès.",
            data : data
        });
        })
        .catch(err => {
        // send a null array if there is an error
        
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la récupération des extraits."
            
        });
        });
}

// Find a single extrait with an id
const findOneExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.findByPk(id)
        .then(data => {
        res.send({
            message: "Extrait récupéré avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la récupération de l'extrait avec l'id=" + id
        });
        });
}

// Update a extrait by the id in the request
const updateExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.update(req.body, {
        where: { extrait_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extrait mis à jour avec succès."
            });
        } else {
            res.status(409).send({
            message: `Impossible de mettre à jour l'extrait avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la mise à jour de l'extrait avec l'id=" + id
        });
        });
}

// Delete a extrait with the specified id in the request
const deleteExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.destroy({
        where: { extrait_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extrait supprimé avec succès!"
            });
        } else {
            res.status(409).send({
            message: `Impossible de supprimer l'extrait avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la suppression de l'extrait avec l'id=" + id
        });
        });
}

module.exports = {
    createExtrait,
    findAllExtrait,
    findOneExtrait,
    updateExtrait,
    deleteExtrait
};

