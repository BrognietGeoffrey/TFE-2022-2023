const { Router } = require('express');
const {authJwt, verifySignUp} = require("../middleware");
const checkRolePermission = require("../middleware/checkRolePermission");

const router = Router();


// Routes pour les logs
const {
    findAll,
    create
} = require('../controllers/logs.controller');
router.get('/logs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAll);
router.post('/logs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], create);

// Routes pour avoir tous les users
const {
    getAllUsers,
    getUserByUsername
}
= require('../controllers/user.controller');
router.get('/users', [authJwt.tokenVerification], getAllUsers);
router.get('/users/:username', [authJwt.tokenVerification], getUserByUsername);

// Routes pour les views
const {
    createCustomView, 
    getAllView, 
} = require('../controllers/view.controllers');
router.post('/createView', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createCustomView);
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
router.get('/facturiers/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOne);
router.post('/facturiers', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createFacturier);
router.put('/facturiers/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], update);
router.delete('/facturiers/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteFacturier);

// Routes pour les clients
const {
    findAllClients,
    findOneClient,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/client.controllers');
router.get('/clients', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllClients);
router.get('/clients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneClient);
router.post('/clients', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createClient);
router.put('/clients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateClient);
router.delete('/clients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteClient);

// Routes pour les comptes clients
const {
    findAllComptesClients,
    findOneCompteClient,
    createCompteClient,
    updateCompteClient,
    deleteCompteClient
} = require('../controllers/compteClient.controllers');
router.get('/comptesClients', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllComptesClients);
router.get('/comptesClients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneCompteClient);
router.post('/comptesClients', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createCompteClient);
router.put('/comptesClients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateCompteClient);
router.delete('/comptesClients/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteCompteClient);

// Routes pour les comptes fournisseurs 
const {
    findAllCompteFournisseur,
    findOneCompteFournisseur,
    createCompteFournisseur,
    updateCompteFournisseur,
    deleteCompteFournisseur
} = require('../controllers/compteFournisseurs.controllers');
router.get('/comptesFournisseurs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllCompteFournisseur);
router.get('/comptesFournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneCompteFournisseur);
router.post('/comptesFournisseurs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createCompteFournisseur);
router.put('/comptesFournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateCompteFournisseur);
router.delete('/comptesFournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteCompteFournisseur);

// Routes pour les fournisseurs
const {
    findAllFournisseur,
    findOneFournisseur,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur
} = require('../controllers/infosFournisseur.controller');
router.get('/fournisseurs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllFournisseur);
router.get('/fournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneFournisseur);
router.post('/fournisseurs', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createFournisseur);
router.put('/fournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateFournisseur);
router.delete('/fournisseurs/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteFournisseur);

// Routes pour les TVA
const {
    findAllTva,
    findOneTva,
    createTva,
    updateTva,
    deleteTva
} = require('../controllers/tva.controller');
router.get('/tva', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllTva);
router.get('/tva/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneTva);
router.post('/tva', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole],  createTva);
router.put('/tva/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateTva);
router.delete('/tva/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteTva);

// Routes pour les décomptes
const {
    findAllDecompte,
    findOneDecompte,
    createDecompte,
    updateDecompte,
    deleteDecompte
} = require('../controllers/decompte.controllers');
router.get('/decompte', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllDecompte);
router.get('/decompte/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneDecompte);
router.post('/decompte', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createDecompte);
router.put('/decompte/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateDecompte);
router.delete('/decompte/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteDecompte);


// Routes pour les factures
const {
    findAllFacture,
    findOneFacture,
    createFacture,
    updateFacture,
    deleteFacture, 
    getLastIdFacture
} = require('../controllers/facture.controller');
router.get('/facture', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllFacture);
router.get('/facture/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneFacture);
router.post('/facture', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createFacture);
router.put('/facture/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateFacture);
router.delete('/facture/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteFacture);
router.get('/factures/lastId', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], getLastIdFacture);

// Routes pour les libelles
const {
    findLibelle, 
    createLibelle,
    findLibelleById
} = require('../controllers/facturedetails.controller');
router.get('/libelles', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findLibelle);
router.get('/libelles/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findLibelleById);
router.post('/libelles', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createLibelle);

// Routes pour les objets 
const {
    findObjet,
    createObjet,
    findObjetById

    
} = require('../controllers/facturedetails.controller');
router.get('/objets', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findObjet);
router.get('/objets/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findObjetById);
router.post('/objets', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createObjet);

// Routes pour les extraits
const {
    findAllExtrait,
    findOneExtrait,
    createExtrait,
    updateExtrait,
    deleteExtrait
} = require('../controllers/extrait.controllers');
router.get('/extrait', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findAllExtrait);
router.get('/extrait/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], findOneExtrait);
router.post('/extrait', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], createExtrait);
router.put('/extrait/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], updateExtrait);
router.delete('/extrait/:id', [authJwt.tokenVerification, authJwt.verifyIsAdminOrModeratorRole], deleteExtrait);



// Routes pour les connexions
const {
    signup, 
    signin,
} = require('../controllers/auth.controller');
const { tokenVerification } = require('../middleware/jwtAuthentification');
router.post('/auth/signup', [verifySignUp.ifUsernameOrEmailExists, verifySignUp.ifRolesExist], signup);
router.post('/auth/signin', signin);
module.exports = router;
