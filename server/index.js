const upload = require('./config/upload.config');
const express = require("express");
const path = require('path');

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const mindee = require("mindee");
const fs = require('fs');


const swaggerFile = require('./swagger_output.json')
//const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi =require('swagger-ui-express')

const sendEmailController = require('./middleware/sendEmail')
require('dotenv').config();
const FormData = require('form-data');
const axios = require('axios');



const apiOCRKey = process.env.OCR_KEY;


const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


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




const routes = require('./routes');
app.use('/api' ,routes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/send-email', sendEmailController);


app.post('/api/ocr-mindee', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;

  // Create a buffer from the file
  const fileBuffer = fs.readFileSync(filePath);

  // Init a new client
  const mindeeClient = new mindee.Client({ apiKey: "b84f02a07c925b3d35cd10cd9ffd3082" });

  // Parse the file using the InvoiceV4 model
  const apiResponse = mindeeClient
  .docFromPath(filePath)
  .parse(mindee.InvoiceV4);

  // Handle the API response
  apiResponse
    .then((resp) => {
      if (resp.document === undefined) {
        throw new Error('Failed to parse document with Mindee API');
      }

      console.log(resp.document); // Full object
      console.log(resp.document.toString()); // String summary

      res.send(resp.document); // Send the parsed data back to the client
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error parsing file with Mindee API');
    });
});


app.use(express.static(__dirname + '/build/'));
app.get('*', (req, res) => {
  return res.sendFile(path
    .join(__dirname + '/build/', 'index.html'))
});






const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    // console.log l'adresse totale du serveur
    console.log(`http://localhost:${port}`)
});
