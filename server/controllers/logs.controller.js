const db = require("../models");
const Op = db.Sequelize.Op;
const { Facturiers, Clients, Fournisseurs, Decomptes, Objets, Libelles, Extraits, Logs, User, Factures, Tva } = require("../models");

// Create and Save a new Log
// Voici les données qui se retrouvent dans la table logs (user_id, facturier_id, fournisseur_id, client_id, libelle_id, objet_id, decompte_id)
const create = async (req, res) => {
    Logs.findOne({
        where: {
        facturier_id: req.body.facturier_id || null, 
        fournisseur_id: req.body.fournisseur_id || null,
        client_id: req.body.client_id || null,
        libelle_id: req.body.libelle_id || null,
        objet_id: req.body.objet_id || null,
        decompte_id: req.body.decompte_id || null, 
        facture_id : req.body.facture_id || null,
        extrait_id : req.body.extrait_id || null,
        tva_id : req.body.tva_id || null,
        userModifiedId : req.body.userModifiedId || null,
        }
    })
    .then(data => {
        
        // Create a log
        const log = {
            user_id: req.body.user_id,
            facturier_id : req.body.facturier_id,
            fournisseur_id : req.body.fournisseur_id,
            client_id : req.body.client_id,
            libelle_id : req.body.libelle_id,
            objet_id : req.body.objet_id,
            decompte_id : req.body.decompte_id, 
            description : req.body.description, 
            facture_id : req.body.facture_id,
            extrait_id : req.body.extrait_id,
            tva_id : req.body.tva_id,
            userModifiedId : req.body.userModifiedId,
        };

        // Save log in the database
        Logs.create(log)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the log."
            });
            });
        }
    )
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the log."
        });
    }
    );
};

const findAll = (req, res) => {
   // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Get all users having an account'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
    // trouver tous les logs
    Logs.findAll({ where: condition, include: [Facturiers, Factures, Fournisseurs, Clients, Libelles, Objets, Decomptes, User, Extraits, Tva] })
    .then(data => {
        res.send(data);
    }
    )
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving logs."
        });
    }
    );
}

module.exports = {
    findAll, 
    create
}






