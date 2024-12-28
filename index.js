import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/config/db.js';
import taskRoutes from './src/apiservices/tasksRoutes.js';
import swaggerSpec from './src/config/swagger.js';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev')); // 'dev' is a predefined format for logging requests
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use('/doc_swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
