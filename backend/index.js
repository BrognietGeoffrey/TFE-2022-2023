// File recup for Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


// File recup for Express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()

// Call for swager
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./routes/auth.routes")(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


// API endpoints for users
// app.get('/users')
// app.get('/users/:id' )
// // app.post('/users' )
// app.delete('/users/:id' )
// app.put('/users/:id')

// // API endpoints for factures
// app.get('/factures', db.getFactures)
// app.get('/factures/:id', db.getFactureById)
// app.post('/factures', db.createFacture)
// app.put('/factures/:id', db.updateFacture)
// app.delete('/factures/:id', db.deleteFacture)

// // API endpoints for clients
// app.get('/clients', db.getClients)
// app.get('/clients/:id', db.getClientById)
// app.post('/clients', db.createClient)
// app.put('/clients/:id', db.updateClient)
// app.delete('/clients/:id', db.deleteClient)

// // API endpoints for names of clients
// app.get('/nameclient', db.getNameClients)
// app.get('/nameclient/:id', db.getNameClientById)
// app.post('/nameclient', db.createNameClient)
// app.put('/nameclient/:id', db.updateNameClient)
// app.delete('/nameclient/:id', db.deleteNameClient)

// // API endpoints for banques
// app.get('/banques', db.getBanques)
// app.get('/banques/:id', db.getBanqueById)
// app.post('/banques', db.createBanque)
// app.put('/banques/:id', db.updateBanque)
// app.delete('/banques/:id', db.deleteBanque)

// // API endpoints for fournisseurs
// app.get('/fournisseurs', db.getFournisseurs)
// app.get('/fournisseurs/:id', db.getFournisseurById)
// app.post('/fournisseurs', db.createFournisseur)
// app.put('/fournisseurs/:id', db.updateFournisseur)
// app.delete('/fournisseurs/:id', db.deleteFournisseur)

// // API endpoints for names of fournisseurs
// app.get('/namefournisseur', db.getNameFournisseurs)
// app.get('/namefournisseur/:id', db.getNameFournisseurById)
// app.post('/namefournisseur', db.createNameFournisseur)
// app.put('/namefournisseur/:id', db.updateNameFournisseur)
// app.delete('/namefournisseur/:id', db.deleteNameFournisseur)

// // API endpoints for decompte
// app.get('/decompte', db.getDecomptes)
// app.get('/decompte/:id', db.getDecompteById)
// app.post('/decompte', db.createDecompte)
// app.put('/decompte/:id', db.updateDecompte)
// app.delete('/decompte/:id', db.deleteDecompte)

// // API endpoints for status factures
// app.get('/statusfacture', db.getStatusFactures)
// app.get('/statusfacture/:id', db.getStatusFactureById)
// app.post('/statusfacture', db.createStatusFacture)
// app.put('/statusfacture/:id', db.updateStatusFacture)
// app.delete('/statusfacture/:id', db.deleteStatusFacture)

// // API endpoints for extrait
// app.get('/extrait', db.getExtraits)
// app.get('/extrait/:id', db.getExtraitById)
// app.post('/extrait', db.createExtrait)
// app.put('/extrait/:id', db.updateExtrait)
// app.delete('/extrait/:id', db.deleteExtrait)

// // API endpoints for facturier
// app.get('/facturier', db.getFacturiers)
// app.get('/facturier/:id', db.getFacturierById)
// app.post('/facturier', db.createFacturier)
// app.put('/facturier/:id', db.updateFacturier)
// app.delete('/facturier/:id', db.deleteFacturier)
