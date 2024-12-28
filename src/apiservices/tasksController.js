import { taskDTO } from './tasksDto.js';
import { findAllTasks, findTaskById, createNewTask, updateTaskById, deleteTaskById } from './tasksDao.js';
export const getTasks = async (req, res) => {
    try {
        const tasks = await findAllTasks();
        console.log("🚀 ~ getTasks ~ tasks:", tasks)
        res.status(200).json(tasks.map(taskDTO));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

export const getTasksId = async (req, res) => {
     const { id } = req.params;
     try {
         const task = await findTaskById(id);
         if (!task) return res.status(404).json({ message: 'Task not found' });
         res.status(200).json(taskDTO(task));
     } catch (error) {
         res.status(500).json({ message: 'Error fetching task', error });
     }
};

export const createTask = async (req, res) => {
     const { title, description, completed } = req.body;
     try {
         const newTask = await createNewTask({ title, description, completed });
         res.status(201).json(taskDTO(newTask));
     } catch (error) {
         res.status(500).json({ message: 'Error creating task', error });
     }
};

export const updateTask = async (req, res) => {
     const { id } = req.params;
     const { title, description, completed } = req.body;
     try {
         const task = await updateTaskById(id, { title, description, completed });
         if (!task) return res.status(404).json({ message: 'Task not found' });
         res.status(200).json(taskDTO(task));
     } catch (error) {
         res.status(500).json({ message: 'Error updating task', error });
     }
};

export const deleteTask = async (req, res) => {
     const { id } = req.params;
     try {
         const deleted = await deleteTaskById(id);
         if (!deleted) return res.status(404).json({ message: 'Task not found' });
         res.status(200).json({ message: 'Task deleted successfully' });
     } catch (error) {
         res.status(500).json({ message: 'Error deleting task', error });
     }
};