const db = require("../models");
const Op = db.Sequelize.Op;
const { Objets, Libelles } = require("../models");

// Create and Save a new factureObjet
const createObjet = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // vérifier si le l'objet existe déjà
    Objets.findOne({
        where: {
        title: req.body.title
        }
    })
    .then(data => {
        if (data) {
        res.status(409).send({
            message: "This objet already exists"
        });
        return;
        } else {
        // Create a factureObjet
        const objet = {
            title: req.body.title,
            description: req.body.description,
        };

        // Save factureObjet in the database
        Objets.create(objet)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the objet."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the objet."
        });
    }
    );
    };
    


// Retrieve all factureObjets from the database.
const findObjet = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
    Objets.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving factureObjets."
        });
        });
    }

// Find a single factureObjet with an id
const findObjetById = (req, res) => {
    const id = req.params.id;

    Objets.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(200).send({
        message: "Error retrieving factureObjet with id=" + id
        });
    });
    }

const updateObjet = (req, res) => {
    const id = req.params.id;

    Objets.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
        res.status(200).send({
            message: "factureObjet was updated successfully."
        });
        } else {
        res.status(409).send({
            message: `Cannot update factureObjet with id=${id}. Maybe factureObjet was not found or req.body is empty!`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Error updating factureObjet with id=" + id
        });
    });
    }



const createLibelle = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // vérifier si le libelle existe déjà
    Libelles.findOne({
        where: {
        title: req.body.title
        }
    })
    .then(data => {
        if (data) {
        res.status(409).send({
            message: "This libelle already exists"
        });
        return;
        } else {
        // Create a factureLibelle
        const libelle = {
            title: req.body.title
        };

        // Save factureLibelle in the database
        Libelles.create(libelle)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Some error occurred while creating the factureLibelle."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
        message:
            err.message || "Some error occurred while creating the factureLibelle."
        });
    });
    }


// Retrieve all factureLibelles from the database.
const findLibelle = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
    Libelles.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving factureLibelles."
        });
        });
    }

// Find a single factureLibelle with an id
const findLibelleById = (req, res) => {
    const id = req.params.id;

    Libelles.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(200).send({
        message: "Error retrieving factureLibelle with id=" + id
        });
    });
    }

const updateLibelle = (req, res) => {
    const id = req.params.id;

    Libelles.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
        res.status(200).send({
            message: "factureLibelle was updated successfully."
        });
        } else {
        res.status(409).send({
            message: `Cannot update factureLibelle with id=${id}. Maybe factureLibelle was not found or req.body is empty!`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Error updating factureLibelle with id=" + id
        });

    });
    }
const validFormBodyLibelle = (body) => {
    if (!body.title) {
        throw new Error("Title can not be empty!");
        
    }
    if (!body) {
        throw new Error("Body can not be empty!");
        
    }
        
};

const validFormBodyObjet = (body) => {
    if (!body.title) {
        throw new Error("Title can not be empty!");
        
    }
    if (!body) {
        throw new Error("Body can not be empty!");
        
    }
        
};


module.exports = {
    createObjet,
    findObjet,
    findObjetById,
    createLibelle,
    findLibelle,
    findLibelleById, 
    updateLibelle, 
    updateObjet,
    validFormBodyObjet, 
    validFormBodyLibelle
}

