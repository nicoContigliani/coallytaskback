import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Utiliza una variable de entorno para configurar la URL del servidor dependiendo del entorno
const serverUrl = process.env.NODE_ENV === 'production'
  ? process.env.URL  // URL de tu API en producción
  : 'http://localhost:5000/api/';     // URL de desarrollo local

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API Nicolas Contigliani',
      version: '1.0.0',
      description: 'API for managing tasks in the system',
    },
    servers: [
      {
        url: serverUrl,
        description: process.env.NODE_ENV === 'production'
          ? 'Production server'
          : 'Development server',  
      },
    ],
  },
  apis: [join(__dirname, '../apiservices/tasks/tasksController.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
