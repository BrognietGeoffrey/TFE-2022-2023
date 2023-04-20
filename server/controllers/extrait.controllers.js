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
        Extraits.create(extrait)
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
const findAllExtrait = (req, res) => {
    Extraits.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        // send a null array if there is an error
        
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving extrait."
            
        });
        });
}

// Find a single extrait with an id
const findOneExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.findByPk(id)
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
const updateExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.update(req.body, {
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
const deleteExtrait = (req, res) => {
    const id = req.params.id;

    Extraits.destroy({
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

module.exports = {
    createExtrait,
    findAllExtrait,
    findOneExtrait,
    updateExtrait,
    deleteExtrait
};

