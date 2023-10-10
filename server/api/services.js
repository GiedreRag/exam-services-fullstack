import express from 'express';
import { connection } from '../dbSetup.js';

export const services = express.Router();

services.post('/', async (req, res) => {
    const { role, id } = req.user;

    if (role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const { title, img, city } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'Service could not be created. "Title" value was empty.',
        });
    }

    if (!img) {
        return res.status(400).json({
            status: 'err',
            msg: 'Service could not be created. "Img" value was empty.',
        });
    }

    if (!city) {
        return res.status(400).json({
            status: 'err',
            msg: 'Service could not be created. Provide "city" value.',
        });
    }

    try {
        const cityQuery = `SELECT id FROM cities WHERE title = ?`;
        const cityRes = await connection.execute(cityQuery, [city]);
        const cityResArray = cityRes[0];

        if (cityResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'City value is invalid.',
            });
        }

        const cityId = cityResArray[0].id;

        const insertQuery = `INSERT INTO services
                (user_id, title, img, city_id)
                VALUES (?, ?, ?, ?);`;
        const insertRes = await connection.execute(insertQuery, 
            [id, title, img, cityId]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Service created.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Service could not be created.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'SERVICE API - server error.',
        });
    }
});

services.get('/users', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT services.id, services.title, services.img, cities.title as city 
                        FROM services 
                        INNER JOIN cities ON cities.id = services.city_id;`;

    } else if (role === 'seller') {
        selectQuery = `SELECT services.id, services.title, services.img, cities.title as city 
                        FROM services 
                        INNER JOIN cities ON cities.id = services.city_id
                        WHERE user_id = ?;`;
    
    } else {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorized.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [req.user.id]);
        const services = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: services,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: SERVICES API - server error.',
        });
    }

});

services.delete('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const { role } = req.user;

    if (role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    try {
        const deleteQuery = `DELETE FROM services WHERE services.id = ?;`;
        const deleteRes = await connection.execute(deleteQuery, [serviceId]);
        const services = deleteRes[0];

        if (services.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Service deleted.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Service not found, nothing deleted.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'DELETE: SERVICES API - server error.',
        });
    }
});

services.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Services" method' });
});