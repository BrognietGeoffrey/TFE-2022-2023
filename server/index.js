const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const swaggerFile = require('./swagger_output.json')
//const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi =require('swagger-ui-express')
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '1gb', type: 'application/pdf' }))

const db = require('./models');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
 
});


const routes = require('./routes');
app.use('/api' ,routes);


const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    // console.log l'adresse totale du serveur
    console.log(`http://localhost:${port}`)
});
