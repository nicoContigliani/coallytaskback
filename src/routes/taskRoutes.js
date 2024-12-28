import express from 'express';
import taskRoutes from '../apiservices/tasksRoutes.js';
const router = express.Router();

router.use('/tasks', taskRoutes);

export default router;