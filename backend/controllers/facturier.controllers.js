// controllers for the facturier
const db = require("../models");
const Op = db.Sequelize.Op;
const Facturier = db.facturier;

// Create and Save a new Facturier
exports.create = (req, res) => {
    // If the numFacturier is already in the database, return an error
    Facturier.findOne({
        where: {
        facture_id: req.body.facture_id
        }
    })

    .then(data => {
        if (data) {
        res.status(200).send({
            message: "This facturier already exists"
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
        Facturier.create(facturier)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(200).send({
                message:
                err.message || "Some error occurred while creating the facturier."
            });
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the facturier."
        });
    }
    );
}

// Retrieve all facturier from the database.
exports.findAll = (req, res) => {
    Facturier.findAll()
        .then(data => {
        // get all factures and add them to the facturier
        const facturiersWithFactures = data.map(facturier => {
            return db.facture.findByPk(facturier.facture_id)
            .then(facture => {
                facturier.facture = facture;
                return facturier;
            })
        })
        return Promise.all(facturiersWithFactures);
        })
        .then(data => {
        res.send(data)
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving facturier."
        });
        });
}
    


// Find a single facturier with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Facturier.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(200).send({
        message: "Error retrieving facturier with id=" + id
        });
    }
    );
}


// Update a facturier by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Facturier.update(req.body, {
        where: { facturier_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "facturier was updated successfully."
        });
        } else {
        res.send({
            message: `Cannot update facturier with id=${id}. Maybe facturier was not found or req.body is empty!`
        });
        }
    }
    )
    .catch(err => {
        res.status(200).send({
        message: "Error updating facturier with id=" + id
        });
    }
    );
}

// Delete a facturier with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Facturier.destroy({
        where: { facturier_id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "facturier was deleted successfully!"
        });
        } else {
        res.send({
            message: `Cannot delete facturier with id=${id}. Maybe facturier was not found!`
        });
        }
    })
    .catch(err => {
        res.status(200).send({
        message: "Could not delete facturier with id=" + id
        });
    });
}
