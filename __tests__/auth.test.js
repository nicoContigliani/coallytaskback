const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Mock authentication route
app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Missing credentials' });
    }

    // Simulate successful authentication
    return res.status(200).send({ token: 'fake-jwt-token' });
});

describe('Authentication Router', () => {
    it('should return a JWT token on successful authentication (fake)', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({ username: 'testuser', password: 'testpass' }) // Send fake credentials
            .expect(200);

        expect(response.body).toHaveProperty('token'); // Check for the presence of a token property
        expect(typeof response.body.token).toBe('string'); // Ensure the token is a string
    });

    it('should return a 400 status code for missing credentials', async () => {
        const response = await request(app)
            .post('/api/auth') // Missing body data
            .send({}) // Empty body
            .expect(400);

        expect(response.body).toHaveProperty('error'); // Ensure an error message is returned
        expect(response.body.error).toBe('Missing credentials'); // Check the error message
    });
});
