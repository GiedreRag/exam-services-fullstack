import express from 'express';
import { connection } from '../dbSetup.js';

export const cities = express.Router();

const ensureAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not an admin.',
        });
    }

    next();
};

cities.post('/', ensureAdmin, async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'City could not be created. "Title" value was empty.',
        });
    }

    try {
        const selectQuery = `SELECT * FROM cities WHERE title = ?;`;
        const selectRes = await connection.execute(selectQuery, [title]);
        const cities = selectRes[0];

        if (cities.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'city',
                        msg: 'Toks miestas jau egzistuoja.',
                    }
                ]
            });
        }

        const insertQuery = `INSERT INTO cities (title) VALUES (?)`;
        const insertRes = await connection.execute(insertQuery, [title]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'City created.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'City could not be created.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: CITIES API - server error.',
        });
    }
});

cities.get('/', async (_req, res) => {
    try {
        const selectQuery = `SELECT title FROM cities;`;
        const selectRes = await connection.execute(selectQuery);
        const cities = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: cities,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: CITIES API - server error.',
        });
    }
});

cities.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Cities" method' });
});