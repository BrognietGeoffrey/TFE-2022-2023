// controller for tva
const db = require("../models");
const { Tva } = require("../models");

const findAllTva = (req, res) => {
    Tva.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            
            message:
            console.log(err) ||
            err.message || "Some error occurred while retrieving tva."
            
        });
    });
}
const findOneTva = (req, res) => {
    const id = req.params.id;

    Tva.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving tva with id=" + id
        });
    });
}
const createTva = (req, res) => {
    // si champ vide alors erreur, si existe alors erreur
    if (!req.body.tva_value || !req.body.tva_description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (req.body.tva_value < 0 || req.body.tva_value > 100) {
        res.status(400).send({
            message: "Tva value must be between 0 and 100"
        });
        return;
    }

    // if tva_value already exists then error
    Tva.findOne({ where: { tva_value: req.body.tva_value } || { description: req.body.description }})
    .then(data => {
        if (data) {
            res.status(400).send({
                message: "Tva value already exists!"
            });
            return;
        }
    })


    // Create a tva
    const tva = {
        tva_value: req.body.tva_value,
        tva_description: req.body.tva_description
    };

    // Save tva in the database
    Tva.create(tva)
    .then(data => {
        res.send(data);
    }
    )
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the tva."
        });
    }
    );
}

const updateTva = (req, res) => {
    const id = req.params.id;
    console.log(id)

    Tva.update(req.body, {
        where: { tva_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tva was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update tva with id=${id}. Maybe tva was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating tva with id=" + id
        });
    });
}

const deleteTva = (req, res) => {
    const id = req.params.id;

    Tva.destroy({
        where: { tva_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tva was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete tva with id=${id}. Maybe tva was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete tva with id=" + id
        });
    });
}

module.exports = {
    findAllTva,
    findOneTva,
    createTva,
    updateTva,
    deleteTva
}







