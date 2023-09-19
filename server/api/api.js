import express from 'express';

export const api = express.Router();

api.all('/', (_req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});