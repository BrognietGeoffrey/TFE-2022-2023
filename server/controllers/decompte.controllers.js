// controllers for the decompte
const db = require("../models");
const Op = db.Sequelize.Op;
const { Decomptes } = require("../models");
// Create and Save a new Decompte
const createDecompte = (req, res) => {
    // If the numDecompte is already in the database, return an error
    Decomptes.findOne({
        where: {
        num_decompte: req.body.num_decompte
        }
    })

    // vérifier si le le décompte existe déjà
    Decomptes.findOne({
        where: {
        num_decompte: req.body.num_decompte
        }
    })
    .then(data => {
        if (data) {
        res.status(409).send({
            message: "Le décompte existe déjà."
        });
        return;
        } else {
        // Create a decompte
        const decompte = {
            num_decompte: req.body.num_decompte,

            type: req.body.type,

        };

        // Save decompte in the database
        Decomptes.create(decompte)
            .then(data => {
            res.send({
                message: "Le décompte a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Malheureusement, une erreur s'est produite lors de la création du décompte."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la création du décompte."
        });
    }
    );
}

// Retrieve all decompte from the database.
const findAllDecompte = (req, res) => {
    Decomptes.findAll()
        .then(data => {
        res.send({
            message: "Les décomptes ont été récupérés avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la récupération des décomptes."
        });
        });
}

// Find a single decompte with an id
const findOneDecompte = (req, res) => {
    const id = req.params.id;

    Decomptes.findByPk(id)
        .then(data => {
        res.send({
            message: "Le décompte a été récupéré avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message: "Impossible de récupérer le décompte avec l'id=" + id
        });
        });
}

// Update a decompte by the id in the request
const updateDecompte = (req, res) => {
    const id = req.params.id;

    Decomptes.update(req.body, {
        where: { decompte_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le décompte a été mis à jour avec succès."
            });
        } else {
            res.status(409).send({
            message: `Impossible de mettre à jour le décompte avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Impossible de mettre à jour le décompte avec l'id=" + id
        });
        });
}

// Delete a decompte with the specified id in the request
const deleteDecompte = (req, res) => {
    const id = req.params.id;

    Decomptes.destroy({
        where: { decompte_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le décompte a été supprimé avec succès!"
            });
        } else {
            res.status(409).send({
            message: `Impossible de supprimer le décompte avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Impossible de supprimer le décompte avec l'id=" + id
        });
        });
}

module.exports = {
    createDecompte,
    findAllDecompte,
    findOneDecompte,
    updateDecompte,
    deleteDecompte
}