// Controllers for compteClient
const db = require("../models");
const Op = db.Sequelize.Op;
const { compteClients, Clients } = require("../models");

// Create and Save a new CompteClient
const createCompteClient = (req, res) => {
    // If the numCompteClient is already in the database, return an error
    compteClients.findOne({
        where: {
        numCompteClient: req.body.numCompteClient
        }
    })

    .then(data => {
        if (data) {
        res.status(409).send({
            message: "This compteClient already exists"
        });
        return;
        } else {
        // Create a compteClient
        const compteClient = {
            numCompteClient: req.body.numCompteClient,
            num_compte_banque : req.body.num_compte_banque,
            client_id: req.body.client_id,
            banque_id: req.body.banque_id,
            description : req.body.description
        };

        // Save compteClient in the database
        compteClients.create(compteClient)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the compteClient."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the compteClient."
        });
    }
    );
};

// Retrieve all compteClients from the database.
  // Swagger 
  /* 
    * @swagger
    * /api/compteClients:
    *   
    *  get:
    *   description: Use to request all compteClients
    *  responses:
    *  '200':
    *  description: A successful response
    * 
    */
    
const findAllComptesClients = (req, res) => {
    // trouver tous les comptes clients et inclure les clients
    compteClients.findAll({
        include: [
            {
                model: Clients,
                as: "client",
            }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(200).send({
        message:
            err.message || "Some error occurred while retrieving compteClients."
        });
    });
};




// Find a single CompteClient with an id
const findOneCompteClient = (req, res) => {
    const id = req.params.id;

    compteClients.findByPk(id)
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
const updateCompteClient = (req, res) => {
    const id = req.params.id;

    compteClients.update(req.body, {
        where: { co_client_id: id }
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
        res.status(409).send({
        message: "Error updating CompteClient with id=" + id
        });
    }
    );
};

// Delete a CompteClient with the specified id in the request
const deleteCompteClient = (req, res) => {
    const id = req.params.id;

    compteClients.findOne({
        where: {
            client_id: id
        }
    })
        .then(compteclient => {
            if (!compteclient) {
                return res.status(404).json({
                    message: `Le compte client avec l'identifiant ${id} n'a pas été trouvé.`
                });
            }

            // Supprimer les informations spécifiques du client
            compteclient.num_compte_banque = null;

            // Enregistrer les modifications dans la base de données
            compteclient.save()
                .then(() => {
                    res.status(200).json({
                        message: "Les informations du compte client ont été supprimées avec succès.",
                        deletedFields: ["num_compte_banque"]
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Une erreur s'est produite lors de la suppression des informations du compte client.",
                        error: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur s'est produite lors de la suppression des informations du compte client.",
                error: err.message
            });
        });
};

module.exports = {
    createCompteClient,
    findAllComptesClients,
    findOneCompteClient,
    updateCompteClient,
    deleteCompteClient
}
