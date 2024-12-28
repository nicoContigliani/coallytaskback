import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import taskRoutes from './src/routes/taskRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Define rutas principales
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
