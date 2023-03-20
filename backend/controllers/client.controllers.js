// Controllers for client 
const db = require("../models");
const Op = db.Sequelize.Op;
const { Clients } = require("../models");

// Create and Save a new Client
exports.create = (req, res) => {
    // If the name_client is already in the database, return an error
    Clients.findOne({
        where: {
        name_client: req.body.name_client
        }
    })

    .then(data => {
        if (data) {
        res.status(200).send({
            message: "This client already exists"
        });
        return;
        } else {
        // Create a client
        const client = {
            name_client: req.body.name_client,
            prenom_client : req.body.prenom_client,
            adresse_client: req.body.adresse_client,
            telephone_client: req.body.telephone_client,
            email_client: req.body.email_client,
            description : req.body.description
        };

        // Save client in the database
        Client.create(client)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the client."
            });
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the client."
        });
    });
}

// Retrieve all clients from the database.
exports.findAll = (req, res) => {
    Clients.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving clients."
        });
        });
    }

// Find a single client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Clients.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving client with id=" + id
        });
        });
    }

// Update a client by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Clients.update(req.body, {
        where: { client_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "client was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update client with id=${id}. Maybe client was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Error updating client with id=" + id
        });
        });
    }

// Delete a client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Clients.destroy({
        where: { client_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "client was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete client with id=${id}. Maybe client was not found!`
            });
        }
        })
        .catch(err => {
        res.status(200).send({
            message: "Could not delete client with id=" + id
        });
        });
    }