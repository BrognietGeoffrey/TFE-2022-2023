// Middleware pour les factures

const db = require("../models");
const {Factures, Tva, Objets, Libelles, Facturiers, compteClients } = require("../models");
const Op = db.Sequelize.Op;

// Create and Save a new Facture
const createFacture = (req, res) => {
    // Validate request
    if (!req.body.num_facture) {
        res.status(409).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // si le numero de facture existe déjà et/ou si le numero de facture lamy existe déjà
    Factures.findOne({
        where: {
            [Op.or]: [
                {num_facture: req.body.num_facture},
                {num_facture_lamy: req.body.num_facture_lamy}
            ]
        }
    })
    .then(facture => {
        if (facture) {
            res.status(409).send({
                message: "Cette facture existe déjà !", 

            });
        }
        else {
            // Create a Facture
            const facture = {
                num_facture: req.body.num_facture,
                facture_date: req.body.facture_date,
                num_facture_lamy: req.body.num_facture_lamy,
                // POur le montant, si il y a un point dans le montant, on le remplace par une virgule
                montant: req.body.montant,
                description: req.body.description,
                estpaye: req.body.estpaye,
                objet_id: req.body.objet_id,
                libelle_id: req.body.libelle_id,
                tva_id : req.body.tva_id, 
                due_date : req.body.due_date,
                facture_img : req.body.facture_img,
            };

            // Save Facture in the database
            Factures.create(facture)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Facture."
                });
                });
            }
        }
    )
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Facture."
        });
    });
};



// Retrieve all Factures from the database.
const findAllFacture = async (req, res) => {
    try {
        const factures = await Factures.findAll({
        include: [
            {
            model: Tva,
     
            
            },
            {
                model: Objets,
            },
            {
                model: Libelles,
            }
            
        
            
        ],
        });
        res.send(factures);
    } catch (err) {
        res.status(200).send({
        message:
            err.message || "Some error occurred while retrieving factures."
        });
    }
};

// Find a single Facture with an id
const findOneFacture = (req, res) => {
    const id = req.params.id;

    Factures.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message: "Error retrieving Facture with id=" + id
        });
        });
    }

    

// Update a Facture by the id in the request
const updateFacture = (req, res) => {
    const id = req.params.id;
    
    // Vérifie si la nouvelle données existe déjà dans la base de données
    Factures.findOne({
        where: {
            [Op.or]: [
                {num_facture: req.body.num_facture},
                {num_facture_lamy: req.body.num_facture_lamy}
            ]
        }
    })
    // si num_facture ou num_facture_lamy existe déjà mais que c'est le même que _previousDataValues alors on peut le modifier
    .then(facture => {
        if (facture) {
            if (facture.num_facture === facture._previousDataValues.num_facture || facture.num_facture_lamy === facture._previousDataValues.num_facture_lamy) {
                Factures.update(req.body, {
                    where: { facture_id: id }
                })

                .then(num => {
                    if (num == 1) {
                    res.send({
                        message: "Facture was updated successfully."
                    });
                    } else {
                    res.send({
                        message: `Cannot update Facture with id=${id}. Maybe Facture was not found or req.body is empty!`
                    });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                    message: "Error updating Facture with id=" + id
                    });
                });
            }
            else {
                res.status(409).send({
                    message: "Cette facture existe déjà !",
                });
            }
        }
        else {
            res.status(409).send({
                message: "Cette facture existe déjà !",
            });
        }
    })

    .catch(err => {
        res.status(500).send({
            message: "Error updating Facture with id=" + id
        });
    });
};






// Delete a Facture with the specified id in the request
const deleteFacture = (req, res) => {
    const id = req.params.id;
    
    Factures.destroy({
        where: { facture_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Facture was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Facture with id=${id}. Maybe Facture was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Facture with id=" + id
        });
        });
    }


//get the last id of facture
const getLastIdFacture = (req, res) => {
    Factures.findOne({ order: [ [ 'facture_id', 'DESC' ]] })
          .then(facture => {
            res.send(facture.facture_id.toString());
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving last facture ID."
            });
          });

}

const getFactureById = (req, res) => {
    // find the co_client_id from the table compte_client
    const id = req.params.id;
    const compteClientData = compteClients.findOne({ where: { client_id: id } })
    .then(compteClientData => {
        // find the facture_id from the table facture
        const facturierData = Facturiers.findAll({ 
            where: { co_client_id: compteClientData.co_client_id }, 
            include: [
                {
                    model: Factures,
                    include: [
                        {
                            model: Tva,
                        },
                        {
                            model: Objets,
                        },
                        {
                            model: Libelles,
                        }
                    ]
                }
            ]
        })
        .then(facturierData => {
            res.send(facturierData);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving facturier."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving compte client."
        });
    });
}

                
        
    




module.exports = {
    createFacture,
    findAllFacture,
    findOneFacture,
    updateFacture,
    deleteFacture,
    getLastIdFacture, 
    getFactureById
}






