const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./backend/index.js']

swaggerAutogen(outputFile, endpointsFiles)