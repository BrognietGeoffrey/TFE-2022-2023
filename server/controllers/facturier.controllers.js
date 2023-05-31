// controllers for the facturier
const db = require("../models");
const { Op } = require("sequelize");
const { Facturiers, Factures, compteFournisseurs, compteClients, Tva, Clients, Fournisseurs, Decomptes, Objets, Libelles, Extraits } = require("../models");
// Create and Save a new Facturier
const createFacturier = (req, res) => {
    // If the numFacturier is already in the database, return an error
    Facturiers.findOne({
        where: {
        facture_id: req.body.facture_id
        }
    })

    .then(data => {
        if (data) {
        res.status(409).send({
            message: "Le facturier existe déjà."
        });
        return;
        } else {
        // Create a facturier
        const facturier = {
            facture_id: req.body.facture_id,
            decompte_id: req.body.decompte_id,
            co_client_id: req.body.co_client_id,
            co_fournisseur_id: req.body.co_fournisseur_id,
            extrait_id : req.body.extrait_id
        };

        // Save facturier in the database
        Facturiers.create(facturier)
            .then(data => {
            res.send({
                message: "Le facturier a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Malheureusement, une erreur s'est produite lors de la création du facturier."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Malheureusement, une erreur s'est produite lors de la création du facturier."
        });
    }
    );
}


// Retrieve all facturiers from the database with include for the foreign keys

const getFacturiers = async (req, res) => {
    try {
        const facturiers = await Facturiers.findAll({
        include: [
            {
            model: Factures,
            include: [
                {
                    model : Tva,
                }, 
                {
                    model : Objets,
                }, 
                {
                    model : Libelles
                }
            ]
            },
            {
            model: compteClients,
            include : {
                model : Clients
            }
          
            },
            {
                model : compteFournisseurs,
                include : {
                    model : Fournisseurs
                }, 
            }, 
            {
                model : Decomptes
            },
            {
                model : Extraits
            }

            
        
            
        ],
        });
        res.send({
        message: "Les facturiers ont bien été récupérés.",
        data : facturiers
        });
    } catch (err) {
        res.status(409).send({
        message:
            err.message || "Malheureusement, une erreur s'est produite lors de la récupération des facturiers."
        });
    }
};

const findOne = (req, res) => {
    const id = req.params.id;

    Facturiers.findByPk(id, {
        include: [
            {
            model: Factures,
            include: [
                {
                    model : Tva,
                }, 
                {
                    model : Objets,
                }, 
                {
                    model : Libelles
                }
            ]
            },
            {
            model: compteClients,
            include : {
                model : Clients
            }
          
            },
            {
                model : compteFournisseurs,
                include : {
                    model : Fournisseurs
                }, 
            }, 
            {
                model : Decomptes
            },
            {
                model : Extraits
            }

            
        
            
        ],
    })
    .then(data => {
        res.send({
        message: "Le facturier a bien été récupéré.",
        data : data
        });
    })
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la récupération du facturier avec l'id=" + id
        });
    });
};



// Update a facturier by the id in the request
const update = (req, res) => {
    const id = req.params.id;

    Facturiers.update(req.body, {
        where: { facturier_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Le facturier a bien été mis à jour."
        });
        } else {
        res.status(409).send({
            message: `Impossible de mettre à jour le facturier avec l'id=${id}.`
        });
        }
    }
    )
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la mise à jour du facturier avec l'id=" + id
        });
    }
    );
}

// Delete a facturier with the specified id in the request
const deleteFacturier = (req, res) => {
    const id = req.params.id;

    Facturiers.destroy({
        where: { facturier_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Le facturier a bien été supprimé."
        });
        } else {
        res.status(409).send({
            message: `Impossible de supprimer le facturier avec l'id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la suppression du facturier avec l'id=" + id
        });
    });
}

module.exports = {
    createFacturier,
    getFacturiers,
    findOne,
    update,
    deleteFacturier
}
