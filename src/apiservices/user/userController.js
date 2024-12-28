import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUserCreation, validateUserLogin, handleValidationErrors } from '../../tools/express_validations.js';
import User from '../../models/User.js';

/**
 * @openapi
 * /users/signup:
 *   post:
 *     summary: Create a new user (signup)
 *     description: Register a new user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating user
 */
export const signup = [
    validateUserCreation,
    handleValidationErrors,
    async (req, res) => {
        const { username, password } = req.body;

        try {
            // Check if the username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                username,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ message: 'User created successfully', user: { username: newUser.username } });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'Error creating user. Please try again later.',
                error: error.message || 'Internal server error'
            });
        }
    }
];

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Invalid credentials)
 *       500:
 *         description: Error logging in
 */
export const login = [
    validateUserLogin,
    handleValidationErrors,
    async (req, res) => {
        const { username, password } = req.body;

        try {
            // Find the user by username
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Create JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { username: user.username, user_status: user.user_status }
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({
                message: 'Error logging in. Please try again later.',
                error: error.message || 'Internal server error'
            });
        }
    }
];
