import express from 'express';
import { connection } from '../dbSetup.js';

export const logout = express.Router();

logout.get('/', async (req, res) => {
    const { userToken } = req.cookies;

    if (!userToken) {
        return res.status(200).json({
            status: 'ok',
            msg: 'You are already loged out.',
        });
    }

    try {
        const selectQuery = `DELETE FROM tokens WHERE token = ?;`;
        const selectRes = await connection.execute(selectQuery, [userToken]);

        const cookie = [
            'userToken=' + userToken,
            'path=/',
            'domain=localhost',
            'max-age=-1',
            // 'Secure',
            'SameSite=Lax',
            'HttpOnly',
        ];
        return res.status(200).set('Set-Cookie', cookie.join('; ')).json({
            status: 'ok',
            msg: 'Session deleted',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: LOGOUT API - server error.',
        });
    }
});

logout.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Logout" method' });
});
