const { response } = require('express');
const db = require('./queries')
const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser'); 
const cors = require('cors')
 
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// API endpoints for users
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.delete('/users/:id', db.deleteUser)
app.put('/users/:id', db.updateUser)

// API endpoints for factures
app.get('/factures', db.getFactures)
app.get('/factures/:id', db.getFactureById)
app.post('/factures', db.createFacture)
app.put('/factures/:id', db.updateFacture)
app.delete('/factures/:id', db.deleteFacture)

// API endpoints for clients
app.get('/clients', db.getClients)
app.get('/clients/:id', db.getClientById)
app.post('/clients', db.createClient)
app.put('/clients/:id', db.updateClient)
app.delete('/clients/:id', db.deleteClient)

// API endpoints for names of clients
app.get('/nameclient', db.getNameClients)
app.get('/nameclient/:id', db.getNameClientById)
app.post('/nameclient', db.createNameClient)
app.put('/nameclient/:id', db.updateNameClient)
app.delete('/nameclient/:id', db.deleteNameClient)

// API endpoints for banques
app.get('/banques', db.getBanques)
app.get('/banques/:id', db.getBanqueById)
app.post('/banques', db.createBanque)
app.put('/banques/:id', db.updateBanque)
app.delete('/banques/:id', db.deleteBanque)

// API endpoints for fournisseurs
app.get('/fournisseurs', db.getFournisseurs)
app.get('/fournisseurs/:id', db.getFournisseurById)
app.post('/fournisseurs', db.createFournisseur)
app.put('/fournisseurs/:id', db.updateFournisseur)
app.delete('/fournisseurs/:id', db.deleteFournisseur)

// API endpoints for names of fournisseurs
app.get('/namefournisseur', db.getNameFournisseurs)
app.get('/namefournisseur/:id', db.getNameFournisseurById)
app.post('/namefournisseur', db.createNameFournisseur)
app.put('/namefournisseur/:id', db.updateNameFournisseur)
app.delete('/namefournisseur/:id', db.deleteNameFournisseur)

// API endpoints for decompte
app.get('/decompte', db.getDecomptes)
app.get('/decompte/:id', db.getDecompteById)
app.post('/decompte', db.createDecompte)
app.put('/decompte/:id', db.updateDecompte)
app.delete('/decompte/:id', db.deleteDecompte)

// API endpoints for status factures
app.get('/statusfacture', db.getStatusFactures)
app.get('/statusfacture/:id', db.getStatusFactureById)
app.post('/statusfacture', db.createStatusFacture)
app.put('/statusfacture/:id', db.updateStatusFacture)
app.delete('/statusfacture/:id', db.deleteStatusFacture)

// API endpoints for extrait
app.get('/extrait', db.getExtraits)
app.get('/extrait/:id', db.getExtraitById)
app.post('/extrait', db.createExtrait)
app.put('/extrait/:id', db.updateExtrait)
app.delete('/extrait/:id', db.deleteExtrait)

// API endpoints for facturier
app.get('/facturier', db.getFacturiers)
app.get('/facturier/:id', db.getFacturierById)
app.post('/facturier', db.createFacturier)
app.put('/facturier/:id', db.updateFacturier)
app.delete('/facturier/:id', db.deleteFacturier)
