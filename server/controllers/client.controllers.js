// Controllers for client 
const db = require("../models");
const Op = db.Sequelize.Op;
const { Clients } = require("../models");

const createClient = (req, res) => {
    Clients.findOne({
        where: {
        name: req.body.name
        }
    })
    .then(data => {
        if (data) {
        res.status(409).send({
            message: "Le client existe déjà."
        });
        return;
        } else {
        const client = {
            name: req.body.name,
            firstname : req.body.firstname,
            adresse_client: req.body.adresse_client,
            telephone_client: req.body.telephone_client,
            email_client: req.body.email_client,
            description : req.body.description, 
        };

        // Save client in the database
        Clients.create(client)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Malheureusement, une erreur s'est produite lors de la création du client."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la création du client."
        });
    });
}

const findAllClients = (req, res) => {

    Clients.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la récupération des clients."
        });
        });
    }

// Find a single client with an id
const findOneClient = (req, res) => {
    const id = req.params.id;

    Clients.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Malheureusement, une erreur s'est produite lors de la récupération du client avec l'id=" + id
        });
        });
    }

// Update a client by the id in the request
const updateClient = (req, res) => {
    const id = req.params.id;

    Clients.update(req.body, {
        where: { client_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le client a été mis à jour avec succès."
            });
        } else {
            res.status(409).send({
            message: `Impossible de mettre à jour le client avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la mise à jour du client avec l'id=" + id
        });
        });
    }

// Delete a client with the specified id in the request
const deleteClient = (req, res) => {
    const id = req.params.id;

    Clients.findByPk(id)
        .then(client => {
            if (!client) {
                return res.status(404).json({
                    message: `Client with id=${id} not found.`
                });
            }

            // Supprimer les informations spécifiques du client
            client.email_client = null;
            client.adresse_client = null;
            client.telephone_client = null;
            client.description = null;

            // Enregistrer les modifications dans la base de données
            client.save()
                .then(() => {
                    res.status(200).json({
                        message: "Les informations du client ont été supprimées avec succès.",
                        deletedFields: ["email_client", "adresse_client", "telephone_client", "description"]
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Une erreur s'est produite lors de la suppression des informations du client.",
                        error: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur s'est produite lors de la suppression des informations du client.",
                error: err.message
            });
        });
};

    const getClientByName = (req, res) => {
        const name = req.params.name;
        const firstname = req.params.firstname;
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
        const condition2 = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null;
        Clients.findAll({ where: condition, condition2 })
            .then(data => {
            res.send({  
                message: "Le client a été trouvé avec succès!",
                data: data
            })
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Malheureusement, une erreur s'est produite lors de la récupération du client."
            });
            });
        }
module.exports = {
    createClient,
    findAllClients,
    findOneClient,
    updateClient,
    deleteClient, 
    getClientByName
}