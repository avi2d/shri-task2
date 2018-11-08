import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const router = express.Router();

const swaggerDefinition = {
  host: 'localhost:5001',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.ts']
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJSDoc(options)));

export default router;
