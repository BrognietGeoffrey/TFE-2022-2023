// controllers for the decompte
const db = require("../models");
const Op = db.Sequelize.Op;
const { Decomptes } = require("../models");
// Create and Save a new Decompte
exports.create = (req, res) => {
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
            message: "This decompte already exists"
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
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the decompte."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the decompte."
        });
    }
    );
}

// Retrieve all decompte from the database.
exports.findAll = (req, res) => {
    Decomptes.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving decompte."
        });
        });
}

// Find a single decompte with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Decomptes.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving decompte with id=" + id
        });
        });
}

// Update a decompte by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Decomptes.update(req.body, {
        where: { decompte_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Decompte was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Decompte with id=${id}. Maybe Decompte was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating Decompte with id=" + id
        });
        });
}

// Delete a decompte with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Decomptes.destroy({
        where: { decompte_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Decompte was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Decompte with id=${id}. Maybe Decompte was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete Decompte with id=" + id
        });
        });
}