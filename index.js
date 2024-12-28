import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/config/db.js';
import taskRoutes from './src/apiservices/tasksRoutes.js';
import swaggerSpec from './src/config/swagger.js';


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use('/doc_swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
