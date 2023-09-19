import express from 'express';
import { connection } from '../dbSetup.js';
import { hash } from '../lib/hash.js';

export const register = express.Router();

register.post('/', async (req, res) => {
    const { fullname, email, password } = req.body;

    const errors = [];

    if (!fullname || fullname.length < 5 || fullname.length > 60) {
        errors.push({
            input: 'fullname',
            msg: 'Fullname length must be between 5 and 60.'
        });
    }

    const nameWords = (fullname || '').split(' ');
    if (nameWords.length < 2 || nameWords.length > 3) {
        errors.push({
            input: 'fullname',
            msg: 'Fullname must consist of two or three words.'
        });
    }

    for (const word of nameWords) {
        if (word[0] !== word[0].toUpperCase()) {
            errors.push({
                input: 'fullname',
                msg: 'Each word in fullname must start with a capital letter followed by lowercase letters.'
            });
        }
    }

    if (!email || email.length < 6 || email.length > 60) {
        errors.push({
            input: 'email',
            msg: 'Email length must be between 6 and 60.'
        });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errors.push({
            input: 'email',
            msg: 'Invalid Email format.'
        });
    }

    if (!password || password.length < 6 || password.length > 60) {
        errors.push({
            input: 'password',
            msg: 'Password length must be between 6 and 60.'
        });
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const selectRes = await connection.execute(selectQuery, [email]);
        const users = selectRes[0];

        if (users.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'email',
                        msg: 'Klaida su ivesta informacija.'
                    }
                ]
            });
        }

        const insertQuery = `INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)`;
        const insertRes = await connection.execute(insertQuery, [fullname, email, hash(password)]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'User created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'User could not be created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: REGISTER API - server error.',
        });
    }
});

register.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Register" method' });
}); 