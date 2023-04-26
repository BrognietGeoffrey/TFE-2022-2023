const { Router } = require('express');
const {authJwt, verifySignUp} = require("../middleware");
const checkRolePermission = require("../middleware/checkRolePermission");

const router = Router();


// Routes pour les logs
const {
    findAll,
    create
} = require('../controllers/logs.controller');
router.get('/logs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAll);
router.post('/logs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), create);

// Routes pour avoir tous les users
const {
    getAllUsers,
    getUserByUsername, 
    getUserAndClient
}
= require('../controllers/user.controller');
router.get('/users', [authJwt.tokenVerification], getAllUsers);
router.get('/users/:username', [authJwt.tokenVerification], getUserByUsername);
router.get('/userClient', [authJwt.tokenVerification], getUserAndClient);

// Routes pour les views
const {
    createCustomView, 
    getAllView, 
} = require('../controllers/view.controllers');
router.post('/createView', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createCustomView);
router.get('/getViews', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), getAllView);

// Routes pour le facturiers
const {
    getFacturiers, 
    findOne, 
    createFacturier, 
    update,
    deleteFacturier 
} = require('../controllers/facturier.controllers');
router.get('/facturiers', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), getFacturiers);
router.get('/facturiers/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOne);
router.post('/facturiers', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createFacturier);
router.put('/facturiers/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), update);
router.delete('/facturiers/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteFacturier);

// Routes pour les clients
const {
    findAllClients,
    findOneClient,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/client.controllers');
router.get('/clients', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllClients);
router.get('/clients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator', 'user']), findOneClient);
router.post('/clients', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createClient);
router.put('/clients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateClient);
router.delete('/clients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteClient);

// Routes pour les comptes clients
const {
    findAllComptesClients,
    findOneCompteClient,
    createCompteClient,
    updateCompteClient,
    deleteCompteClient
} = require('../controllers/compteClient.controllers');
router.get('/compteClients', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllComptesClients);
router.get('/compteClients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneCompteClient);
router.post('/compteClients', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createCompteClient);
router.put('/compteClients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateCompteClient);
router.delete('/compteClients/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteCompteClient);

// Routes pour les comptes fournisseurs 
const {
    findAllCompteFournisseur,
    findOneCompteFournisseur,
    createCompteFournisseur,
    updateCompteFournisseur,
    deleteCompteFournisseur
} = require('../controllers/compteFournisseurs.controllers');
router.get('/compteFournisseurs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllCompteFournisseur);
router.get('/compteFournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneCompteFournisseur);
router.post('/compteFournisseurs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createCompteFournisseur);
router.put('/compteFournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateCompteFournisseur);
router.delete('/compteFournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteCompteFournisseur);

// Routes pour les fournisseurs
const {
    findAllFournisseur,
    findOneFournisseur,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur
} = require('../controllers/infosFournisseur.controller');
router.get('/fournisseurs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllFournisseur);
router.get('/fournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneFournisseur);
router.post('/fournisseurs', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createFournisseur);
router.put('/fournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateFournisseur);
router.delete('/fournisseurs/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteFournisseur);

// Routes pour les TVA
const {
    findAllTva,
    findOneTva,
    createTva,
    updateTva,
    deleteTva
} = require('../controllers/tva.controller');
router.get('/tva', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllTva);
router.get('/tva/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneTva);
router.post('/tva', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']),  createTva);
router.put('/tva/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateTva);
router.delete('/tva/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteTva);

// Routes pour les décomptes
const {
    findAllDecompte,
    findOneDecompte,
    createDecompte,
    updateDecompte,
    deleteDecompte
} = require('../controllers/decompte.controllers');
router.get('/decomptes', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllDecompte);
router.get('/decomptes/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneDecompte);
router.post('/decomptes', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createDecompte);
router.put('/decomptes/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateDecompte);
router.delete('/decomptes/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteDecompte);


// Routes pour les factures
const {
    findAllFacture,
    findOneFacture,
    createFacture,
    updateFacture,
    deleteFacture, 
    getLastIdFacture, 
    getFactureById
} = require('../controllers/facture.controller');
router.get('/facture', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllFacture);
router.get('/facture/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneFacture);
router.post('/facture', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createFacture);
router.put('/facture/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateFacture);
router.delete('/facture/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteFacture);
router.get('/factures/lastId', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), getLastIdFacture);
router.get('/factures/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator', 'user']), getFactureById);

// Routes pour les libelles
const {
    findLibelle, 
    createLibelle,
    findLibelleById
} = require('../controllers/facturedetails.controller');
router.get('/libelle', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findLibelle);
router.get('/libelle/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findLibelleById);
router.post('/libelle', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createLibelle);

// Routes pour les objets 
const {
    findObjet,
    createObjet,
    findObjetById

    
} = require('../controllers/facturedetails.controller');
router.get('/objet', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findObjet);
router.get('/objet/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findObjetById);
router.post('/objet', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createObjet);

// Routes pour les extraits
const {
    findAllExtrait,
    findOneExtrait,
    createExtrait,
    updateExtrait,
    deleteExtrait
} = require('../controllers/extrait.controllers');
router.get('/extraits', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findAllExtrait);
router.get('/extraits/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), findOneExtrait);
router.post('/extraits', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createExtrait);
router.put('/extraits/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), updateExtrait);
router.delete('/extraits/:id', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), deleteExtrait);

// Routes pour les comments 
const {

    createComment,
    getAllComments

} = require('../controllers/comments.controller');
;
router.post('/comments', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), createComment);
router.get('/comments', [authJwt.tokenVerification], checkRolePermission(['admin', 'moderator']), getAllComments);



// Routes pour les connexions
const {
    signup, 
    signin,
} = require('../controllers/auth.controller');
const { tokenVerification } = require('../middleware/jwtAuthentification');
router.post('/auth/signup', [verifySignUp.ifUsernameOrEmailExists, verifySignUp.ifRolesExist], signup);
router.post('/auth/signin', signin);
module.exports = router;
