// Middleware pour les factures

const db = require("../models");
const {Factures, Tva, Objets, Libelles, Facturiers, compteClients } = require("../models");
const Op = db.Sequelize.Op;

// Create and Save a new Facture
const createFacture = (req, res) => {
    // Validate request
    if (!req.body.num_facture) {
        res.status(409).send({
        message: "Le numéro de facture ne peut pas être vide !"
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
                facture_date: new Date(req.body.facture_date), // Convertir la date en objet Date
                num_facture_lamy: req.body.num_facture_lamy,
                montant: req.body.montant,
                description: req.body.description,
                estpaye: req.body.estpaye,
                objet_id: req.body.objet_id,
                libelle_id: req.body.libelle_id,
                tva_id: req.body.tva_id,
                due_date: new Date(req.body.due_date), // Convertir la date en objet Date
                facture_img: req.body.facture_img
            };

            facture.facture_date.setHours(facture.facture_date.getHours() + 2); // Ajouter 2 heures à la date
            facture.due_date.setHours(facture.due_date.getHours() + 2)

            // Save Facture in the database
            Factures.create(facture)
                .then(data => {
                res.send({
                    message: "La facture a été créée avec succès.",
                    data : data
                });
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Une erreur s'est produite lors de la création de la facture."
                });
                });
            }
        }
    )
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la création de la facture."
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
        res.status(409).send({
        message:
            err.message || "Une erreur s'est produite lors de la récupération des factures."
        });
    }
};

// Find a single Facture with an id
const findOneFacture = (req, res) => {
    const id = req.params.id;

    Factures.findByPk(id)
        .then(data => {
        res.send({
            message: "La facture a été récupérée avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la récupération de la facture avec l'id=" + id
        });
        });
    }

    

// Update a Facture by the id in the request
const updateFacture = (req, res) => {
    const id = req.params.id;

    Factures.update(req.body, {
        where: { facture_id: id }
        })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "La facture a été mise à jour avec succès."
            });
        } else {
            res.status(409).send({
            message: `Impossible de mettre à jour la facture avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la mise à jour de la facture avec l'id=" + id
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
            message: "La facture a été supprimée avec succès!"
            });
        } else {
            res.status(409).send({
            message: `Impossible de supprimer la facture avec l'id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(409).send({
            message: "Une erreur s'est produite lors de la suppression de la facture avec l'id=" + id
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
            res.status(409).send({
              message:
                err.message || "Une erreur s'est produite lors de la récupération de la facture."
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
            res.status(409).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération de la facture."
            });
        });
    })
    .catch(err => {
        res.status(409).send({
            message:
                err.message || "Une erreur s'est produite lors de la récupération de la facture."
        });
    });
}

const validFormBodyFacture = (body) => {
    if(!body) return res.status(500).send({
        message: "Content can not be empty!"
        });

    if (!body.num_facture || body.num_facture === "") {
        throw new Error("Numéro de facture obligatoire");
    }
    if (!body.num_facture_lamy || body.num_facture_lamy === "") {
        throw new Error("Numéro de facture Lamy obligatoire");
    }
    if (!body.facture_date || body.facture_date === "") {
        throw new Error("Date de facture obligatoire");
    }
    if (body.libelle_id === "" || !body.libelle_id) {
        throw new Error("Libellé obligatoire");
    }
    if (body.objet_id === "" || !body.objet_id) {
        throw new Error("Objet obligatoire");
    }
    if (body.tva_id === "" || !body.tva_id) {
        throw new Error("TVA obligatoire");
    }
    if (!body.montant|| body.montant=== "") {
        throw new Error("Montant obligatoire");
    }
}                
        
    




module.exports = {
    createFacture,
    findAllFacture,
    findOneFacture,
    updateFacture,
    deleteFacture,
    getLastIdFacture, 
    getFactureById, 
    validFormBodyFacture
}






