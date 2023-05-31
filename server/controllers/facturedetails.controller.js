const db = require("../models");
const Op = db.Sequelize.Op;
const { Objets, Libelles } = require("../models");

// Create and Save a new factureObjet
const createObjet = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(409).send({
        message: "Le titre ne peut pas être vide!"
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
            message: "Cet objet existe déjà !"
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
            res.send({
                message: "L'objet a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                "Une erreur s'est produite lors de la création de l'objet."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
            message:
            "Une erreur s'est produite lors de la création de l'objet."
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
        res.status(409).send({
            message:
            err.message || "Une erreur s'est produite lors de la récupération des objets."
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
        res.status(409).send({
        message: "Une erreur s'est produite lors de la récupération de l'objet avec l'id=" + id
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
            message: "L'objet a été mis à jour avec succès."
        });
        } else {
        res.status(409).send({
            message: `Impossible de mettre à jour l'objet avec l'id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la mise à jour de l'objet avec l'id=" + id
        });
    });
    }



const createLibelle = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(409).send({
        message: "Le libelle ne peut pas être vide!"
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
            message: "Ce libelle existe déjà !"
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
            res.send({
                message: "Le libelle a été créé avec succès.",
                data : data
            });
            })
            .catch(err => {
            res.status(409).send({
                message:
                err.message || "Une erreur s'est produite lors de la création du libelle."
            });
            });
        }
    })
    .catch(err => {
        res.status(409).send({
        message:
            err.message || "Une erreur s'est produite lors de la création du libelle."
        });
    });
    }


// Retrieve all factureLibelles from the database.
const findLibelle = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
    Libelles.findAll({ where: condition })
        .then(data => {
        res.send({
            message: "Les libelles ont été récupérés avec succès.",
            data : data
        });
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Une erreur s'est produite lors de la récupération des libelles."
        });
        });
    }

// Find a single factureLibelle with an id
const findLibelleById = (req, res) => {
    const id = req.params.id;

    Libelles.findByPk(id)
    .then(data => {
        res.send({
        message: "Le libelle a été récupéré avec succès.",
        data : data
        });
    })
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la récupération du libelle avec l'id=" + id
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
            message: "Le libelle a été mis à jour avec succès."
        });
        } else {
        res.status(409).send({
            message: `Impossible de mettre à jour le libelle avec l'id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(409).send({
        message: "Une erreur s'est produite lors de la mise à jour du libelle avec l'id=" + id
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

