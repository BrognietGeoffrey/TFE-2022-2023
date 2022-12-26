// Controllers for extrait
const db = require("../models");
const Op = db.Sequelize.Op;
const Extrait = db.extraits;

// Create and Save a new Extrait
exports.create = (req, res) => {
    // If the numExtrait is already in the database, return an error
    Extrait.findOne({
        where: {
        num_extrait: req.body.num_extrait
        }
    })

    .then(data => {
        if (data) {
        res.status(200).send({
            message: "This extrait already exists"
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
        Extrait.create(extrait)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the extrait."
            });
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the extrait."
        });
    });
}

// Retrieve all extrait from the database.
exports.findAll = (req, res) => {
    Extrait.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving extrait."
        });
        });
}

// Find a single extrait with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Extrait.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving extrait with id=" + id
        });
        });
}

// Update a extrait by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Extrait.update(req.body, {
        where: { extrait_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extrait was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Extrait with id=${id}. Maybe Extrait was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating Extrait with id=" + id
        });
        });
}

// Delete a extrait with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Extrait.destroy({
        where: { extrait_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extrait was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Extrait with id=${id}. Maybe Extrait was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete Extrait with id=" + id
        });
        });
}
