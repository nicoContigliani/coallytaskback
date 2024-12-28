import express from 'express';
import { signup, login } from './userController.js'; // Import user controller

const router = express.Router();

// Routes for signup and login
router.post('/signup', signup);
router.post('/login', login);

export default router;