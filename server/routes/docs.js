var express = require('express')
var router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Snappit API',
      version: '1.0.0',
      description: 'Documetation for API definitions for snappit',
    },
  },
  apis: ['server/routes/index.js'],
};

const specs = swaggerJsdoc(options);
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router