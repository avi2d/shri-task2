const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  host: 'localhost:5001',
  basePath: '/'
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./controllers/*.js']
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJSDoc(options)));

module.exports = router;
