import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/config/db.js';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan
import taskRoutes from './src/apiservices/tasks/tasksRoutes.js';
import authRoutes from './src/apiservices/auth/authRoutes.js';
import swaggerSpec from './src/config/swagger.js';
import { verifyToken } from './src/midelware/auth.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev')); 
app.use(express.json());


app.use('/api/auth',authRoutes)

app.use('/api/tasks',verifyToken ,taskRoutes);

app.use('/doc_swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
