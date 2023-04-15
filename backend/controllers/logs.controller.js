const db = require("../models");
const Op = db.Sequelize.Op;
const { Facturiers, Clients, Fournisseurs, Decomptes, Objets, Libelles, Extraits, Logs, User } = require("../models");

// Create and Save a new Log
// Voici les données qui se retrouvent dans la table logs (user_id, facturier_id, fournisseur_id, client_id, libelle_id, objet_id, decompte_id)
exports.create = (req, res) => {
    // If the facturier_id is already in the database or if the fournisseur_id is already in the database or if the client_id is already in the database or if the libelle_id is already in the database or if the objet_id is already in the database or if the decompte_id is already in the database, return an error

    Logs.findOne({
        where: {
        facturier_id: req.body.facturier_id || null, 
        fournisseur_id: req.body.fournisseur_id || null,
        client_id: req.body.client_id || null,
        libelle_id: req.body.libelle_id || null,
        objet_id: req.body.objet_id || null,
        decompte_id: req.body.decompte_id || null
        
        }
    })

    .then(data => {
        if (data) {
        res.status(409).send({
            message: "This log already exists"
        });
        return;
        } else {
        // Create a log
        const log = {
            user_id: req.body.user_id,
            facturier_id : req.body.facturier_id,
            fournisseur_id : req.body.fournisseur_id,
            client_id : req.body.client_id,
            libelle_id : req.body.libelle_id,
            objet_id : req.body.objet_id,
            decompte_id : req.body.decompte_id, 
            description : req.body.description
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
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the log."
        });
    }
    );
}

exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
    // trouver tous les logs
    Logs.findAll({ where: condition, include: [Facturiers, Fournisseurs, Clients, Libelles, Objets, Decomptes, User] })
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
};





