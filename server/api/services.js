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

services.get('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT services.id, services.title, services.img, cities.title as city 
                        FROM services 
                        INNER JOIN cities ON cities.id = services.city_id;`;

    } else if (role === 'seller') {
        selectQuery = `SELECT services.id, services.title, services.img, cities.title as city 
                        FROM services 
                        INNER JOIN cities ON cities.id = services.city_id;`;
    
    } else {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorized.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [serviceId]);
        const services = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            service: services[0],
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

services.put('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const { role, id } = req.user;
    const { img, title, city } = req.body;

    if (role !== 'seller') {
        return res.status(401).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const selectQuery = `SELECT * FROM services WHERE id = ?;`;
    const [selectedServices] = await connection.execute(selectQuery, [serviceId]);

    if (selectedServices.length < 1) {
        return res.status(404).json({
            status: 'err',
            msg: 'Service not found.',
        });
    }

    if (role === 'seler' && selectedServices[0].user_id !== id) {
        return res.status(401).json({
            status: 'err',
            msg: 'Unauthorised. You are not the original poster.',
        });
    }

    try {
        const cityQuery = `SELECT id FROM cities WHERE title = ?;`;
        const [cityResArray] = await connection.execute(cityQuery, [city]);

        if (cityResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'City value is invalid.',
            });
        }

        const cityId = cityResArray[0].id;

        const updateQuery = `UPDATE services SET img = ?, title = ?, city_id = ? WHERE id = ?`;
        const updateResObject = await connection.execute(updateQuery, [img, title, cityId, serviceId]);

        if (updateResObject[0].affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Service updated',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Servize could not be updated',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'PUT: SERVICE API - server error.',
        });
    }
});

services.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Services" method' });
});