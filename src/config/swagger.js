import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '1.0.0',
      description: 'API for managing tasks in the system',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/',
        description: 'Development server',
      },
    ],
  },
  apis: [join(__dirname, '../apiservices/tasksController.js')],  // This points to your controller file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
