// controller for tva
const db = require("../models");
const { Tva } = require("../models");

const findAllTva = (req, res) => {
    Tva.findAll()
    .then(data => {
        res.send({
            message: "Liste des tva récupérée avec succès.",
            data : data
        });
    })
    .catch(err => {
        res.status(409).send({
            
            message: "Malheureusement, une erreur s'est produite lors de la récupération des tva."
            
        });
    });
}
const findOneTva = (req, res) => {
    const id = req.params.id;

    Tva.findByPk(id)
    .then(data => {
        res.send({
            message: "Tva récupérée avec succès.",
            data : data
        });
    })
    .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la récupération de la tva avec l'id=" + id
        });
    });
}
const createTva = (req, res) => {
    // si champ vide alors erreur, si existe alors erreur
    if (!req.body.tva_value || !req.body.tva_description) {
        res.status(409).send({
            message: "La valeur de la tva et sa description sont obligatoires."
        });
        return;
    }

    if (req.body.tva_value < 0 || req.body.tva_value > 100) {
        res.status(409).send({
            message: "La valeur de la tva doit être comprise entre 0 et 100."
        });
        return;
    }

    // if tva_value already exists then error
    Tva.findOne({ where: { tva_value: req.body.tva_value } || { description: req.body.description }})
    .then(data => {
        if (data) {
            res.status(409).send({
                message: "La tva existe déjà."
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
        res.send({
            message: "La tva a été créée avec succès.",
            data : data
        });
    }
    )
    .catch(err => {
        res.status(409).send({
            message: "Malheureusement, une erreur s'est produite lors de la création de la tva."
        });
    }
    );
}

const updateTva = (req, res) => {
    const id = req.params.id;

    Tva.update(req.body, {
        where: { tva_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La tva a été mise à jour avec succès."
            });
        } else {
            res.status(409).send({
                message: `Impossible de mettre à jour la tva avec l'id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la mise à jour de la tva avec l'id=" + id
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
                message: "La tva a été supprimée avec succès!"
            });
        } else {
            res.send({
                message: `Impossible de supprimer la tva avec l'id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la suppression de la tva avec l'id=" + id
        });
    });
}

const getTvaByValue = (req, res) => {
    const value = req.params.value;

    Tva.findOne({ where: { tva_value: value }})
    .then(data => {
        res.send({
            message: "Tva récupérée avec succès.",
            data : data
        });
    })
    .catch(err => {
        res.status(409).send({
            message: "Erreur lors de la récupération de la tva avec la valeur=" + value
        });
    });
}

const validFormBodyTva = (body) => {
    if (!body.tva_value) {
        throw new Error("Value can not be empty!");
        
    }
    if (!body) {
        throw new Error("Body can not be empty!"); 
    }
        
};

module.exports = {
    findAllTva,
    findOneTva,
    createTva,
    updateTva,
    deleteTva, 
    getTvaByValue, 
    validFormBodyTva
}







