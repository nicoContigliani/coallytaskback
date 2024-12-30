import express from 'express';
import { createTask, deleteTask, getTasks, getTasksId, updateTask,filterTask } from './tasksController.js';

const router = express.Router();
router.get('/filter',filterTask)

router.get('/', getTasks);
router.get('/:id', getTasksId);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;