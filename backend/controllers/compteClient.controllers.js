// Controllers for compteClient
const db = require("../models");
const Op = db.Sequelize.Op;
const { CoClients } = require("../models");

// Create and Save a new CompteClient
exports.create = (req, res) => {
    // If the numCompteClient is already in the database, return an error
    CoClients.findOne({
        where: {
        numCompteClient: req.body.numCompteClient
        }
    })

    .then(data => {
        if (data) {
        res.status(200).send({
            message: "This compteClient already exists"
        });
        return;
        } else {
        // Create a compteClient
        const compteClient = {
            numCompteClient: req.body.numCompteClient,

            client_id: req.body.client_id,
            banque_id: req.body.banque_id,
            description : req.body.description
        };

        // Save compteClient in the database
        CompteClient.create(compteClient)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the compteClient."
            });
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the compteClient."
        });
    }
    );
};

// Retrieve all compteClients from the database.
exports.findAll = (req, res) => {
    CoClients.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving compteClients."
        });
        });
}

// Find a single CompteClient with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CoClients.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving CompteClient with id=" + id
        });
        });
}

// Update a CompteClient by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    CoClients.update(req.body, {
        where: { compteClient_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "CompteClient  was updated successfully."
        });
        } else {
        res.send({
            message: `Cannot update CompteClient with id=${id}. Maybe CompteClient was not found or req.body is empty!`
        });
        }
    })
    .catch(err => {
        res.status(200).send({
        message: "Error updating CompteClient with id=" + id
        });
    }
    );
};

// Delete a CompteClient with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CoClients.destroy({
        where: { compteClient_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "CompteClient was deleted successfully!"
        });
        } else {
        res.send({
            message: `Cannot delete CompteClient with id=${id}. Maybe CompteClient was not found!`
        });
        }
    })
    .catch(err => {
        res.status(200).send({
        message: "Could not delete CompteClient with id=" + id
        });
    }
    );
}
