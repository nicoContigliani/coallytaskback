import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY_JWT || 'secret_key';
const router = express.Router();

//fake autentication
router.post('/', (req, res) => {
    const token = jwt.sign({ user: "demoUser" }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

export default router;