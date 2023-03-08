// controller for tva
const db = require("../models");
const Tva = db.tva;


exports.findAll = (req, res) => {
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

exports.findOne = (req, res) => {
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
