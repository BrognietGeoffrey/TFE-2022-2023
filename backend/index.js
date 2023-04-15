// File recup for Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const keys = require('./config/db.config')

// File recup for Express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()


// Postgres connection
const { Pool } = require('pg')
const pgClient = new Pool({
  user : keys.pgUser,
  host : keys.pgHost,
  database : keys.pgDatabase,
  password : keys.pgPassword,
  port : keys.pgPort,
  dialect : keys.dialect,
})
pgClient.on('error', () => console.log('Lost PG connection'))
// Call for swager
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');
// db.sequelize.sync();



// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});





// routes
// require all files for routes

require("./routes/logs.routes")(app);
require("./routes/view.route.js")(app);
require("./routes/auth.routes")(app);
require('./routes/user.routes')(app);
require("./routes/facture.route")(app);
require("./routes/banque.route")(app);
require("./routes/compteFournisseurs.route")(app);
require("./routes/client.routes.js")(app);
require("./routes/compteClient.routes.js")(app);
require("./routes/extraits.route.js")(app);
require("./routes/decompte.route.js")(app);
require("./routes/facturier.route.js")(app);
require("./routes/infoFournisseurs.route.js")(app);
require("./routes/factureDetails.route.js")(app);
require("./routes/tva.routes.js")(app);




// set port, listen for requests
const port = 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    }
)

