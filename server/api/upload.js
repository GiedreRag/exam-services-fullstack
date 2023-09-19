import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();

const serviceStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images/service');
    },
    filename: (_req, file, cb) => {
        cb(null, 'service_' + Date.now() + path.extname(file.originalname));
    },
});

const serviceUpload = multer({
    storage: serviceStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/service', serviceUpload.single('service_img'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/service/' + req.file.filename,
    });
});

upload.use('/', (_req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Upload" route.',
        options: [
            'http://localhost:3001/api/upload/service',
        ],
    });
});

upload.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Upload" method' });
});
