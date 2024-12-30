import { taskDTO } from './tasksDto.js';
import { findAllTasks, findTaskById, createNewTask, updateTaskById, deleteTaskById, filterTasks } from './tasksDao.js';
import { validateTaskId, validateTaskCreation, validateTaskUpdate, handleValidationErrors } from '../../tools/express_validations.js';

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
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            message: 'Error fetching tasks. Please try again later.',
            error: error.message || 'Internal server error'
        });
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
            if (!task) {
                return res.status(404).json({ message: `Task with ID ${id} not found.` });
            }
            res.status(200).json(taskDTO(task));
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            res.status(500).json({
                message: `Error fetching task with ID ${id}. Please try again later.`,
                error: error.message || 'Internal server error'
            });
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
            console.error('Error creating task:', error);
            res.status(500).json({
                message: 'Error creating task. Please try again later.',
                error: error.message || 'Internal server error'
            });
        }
    }
];

/**
 * @openapi
 * /tasks/filter:
 *   post:
 *     summary: Retrieve tasks with dynamic filtering
 *     description: Retrieve a list of tasks based on a dynamic filter provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 description: A JSON object representing the filter criteria for the tasks (e.g., {"completed":true,"priority":"high"}).
 *             example:
 *               filter: 
 *                 completed: true
 *                 priority: high
 *     responses:
 *       200:
 *         description: List of tasks that match the filter criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the task.
 *                   title:
 *                     type: string
 *                     description: Title of the task.
 *                   description:
 *                     type: string
 *                     description: Description of the task.
 *                   completed:
 *                     type: boolean
 *                     description: Indicates if the task is completed.
 *                   priority:
 *                     type: string
 *                     enum: [low, medium, high]
 *                     description: Priority level of the task.
 *       400:
 *         description: Invalid filter format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid filter format. Please provide a valid JSON object.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching tasks. Please try again later.
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */


export const filterTask = [
    async (req, res) => {
        try {
            const filter = {};
            console.log("🚀 ~ req.query:", req.query)

            // Construir el objeto de filtro a partir de los query parameters
            if (req.query.completed) {
                filter.completed = req.query.completed === 'true';
            }
            if (req.query.title) {
                filter.title = { $regex: req.query.title, $options: 'i' };
            }
            // Agrega más campos de filtro según sea necesario

            console.log("🚀 ~ Filtro recibido:", filter);

            const tasks = await filterTasks(filter);

            console.log("🚀 ~ Tareas encontradas:", tasks);

            if (!tasks.length) {
                console.warn('No se encontraron tareas con el filtro proporcionado.');
            }

            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({
                message: 'Error fetching tasks. Please try again later.',
                error: error.message || 'Internal server error',
            });
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
            const updatedData = {};

            if (title !== undefined) updatedData.title = title;
            if (description !== undefined) updatedData.description = description;
            if (completed !== undefined) updatedData.completed = completed;

            if (Object.keys(updatedData).length === 0) {
                return res.status(400).json({ message: 'No data provided to update.' });
            }

            const task = await updateTaskById(id, updatedData);

            if (!task) {
                return res.status(404).json({ message: `Task with ID ${id} not found.` });
            }

            res.status(200).json(taskDTO(task)); // Devuelve el DTO o el formato que prefieras

        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({
                message: `Error updating task with ID ${id}. Please try again later.`,
                error: error.message || 'Internal server error'
            });
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
            if (!deleted) {
                return res.status(404).json({ message: `Task with ID ${id} not found.` });
            }
            res.status(200).json({ message: `Task with ID ${id} deleted successfully.` });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({
                message: `Error deleting task with ID ${id}. Please try again later.`,
                error: error.message || 'Internal server error'
            });
        }
    }
];
