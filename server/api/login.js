import { randomUUID } from 'crypto';
import express from 'express';
import { connection } from '../dbSetup.js';
import { hash } from '../lib/hash.js';

export const login = express.Router();

login.post('/', async (req, res) => {
    const { email, password } = req.body;

    const errors = [];

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

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'err-list',
            errors: errors
        });
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password_hash = ?;`;
        const selectRes = await connection.execute(selectQuery, [email, hash(password)]);
        const users = selectRes[0];

        if (users.length === 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'email',
                        msg: 'Toks email arba slaptazodis neegzistuoja. Pabandykite dar karta.'
                    }
                ]
            });
        }

        const userObj = users[0];

        const token = randomUUID();

        const insertQuery = `INSERT INTO tokens (token, user_id) VALUES (?, ?)`;
        const insertRes = await connection.execute(insertQuery, [token, userObj.id]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            const cookie = [
                'userToken=' + token,
                'path=/',
                'domain=localhost',
                'max-age=86400',
                // 'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ];

            delete userObj.id;

            return res.status(200).set('Set-Cookie', cookie.join('; ')).json({
                status: 'ok',
                msg: 'Token created',
                user: userObj,
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Token could not be created',
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: LOGIN API - server error.',
        });
    }
});

login.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Login" method' });
}); 