const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
 
});


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

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
