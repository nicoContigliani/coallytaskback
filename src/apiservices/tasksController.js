import { taskDTO } from './tasksDto.js';
import { findAllTasks, findTaskById, createNewTask, updateTaskById, deleteTaskById } from './tasksDao.js';
import { validateTaskId, validateTaskCreation, validateTaskUpdate, handleValidationErrors } from '../tools/express_validations.js';

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 */
export const getTasks = async (req, res) => {
    try {
        const tasks = await findAllTasks();
        res.status(200).json(tasks.map(taskDTO));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A task object
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid task ID
 */
export const getTasksId = [
    validateTaskId,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        try {
            const task = await findTaskById(id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json(taskDTO(task));
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task', error });
        }
    }
];

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *               - description
 *               - completed
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating task
 */
export const createTask = [
    validateTaskCreation,
    handleValidationErrors,
    async (req, res) => {
        const { title, description, completed } = req.body;
        try {
            const newTask = await createNewTask({ title, description, completed });
            res.status(201).json(taskDTO(newTask));
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    }
];

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update the task details based on the task ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *               - description
 *               - completed
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */
export const updateTask = [
    validateTaskUpdate,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        try {
            const task = await updateTaskById(id, { title, description, completed });
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json(taskDTO(task));
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    }
];

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */
export const deleteTask = [
    validateTaskId,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await deleteTaskById(id);
            if (!deleted) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    }
];

