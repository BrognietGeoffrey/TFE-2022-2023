const db = require("../models");
const Op = db.Sequelize.Op;
const { Objets, Libelles } = require("../models");

// Create and Save a new factureObjet
exports.createObjet = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a factureObjet
    const objet = {
        title: req.body.title
    };
    
    // Save factureObjet in the database
    Objets.create(objet)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the factureObjet."
        });
        });
    }

// Retrieve all factureObjets from the database.
exports.findObjet = (req, res) => {
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
exports.findObjetById = (req, res) => {
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


exports.createLibelle = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
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
        res.status(200).send({
            message:
            err.message || "Some error occurred while creating the factureLibelle."
        });
        });
    }

// Retrieve all factureLibelles from the database.
exports.findLibelle = (req, res) => {
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
exports.findLibelleById = (req, res) => {
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

