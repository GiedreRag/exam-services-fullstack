import express from 'express';
import { register } from './register.js';

export const api = express.Router();

api.all('/', (_req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);