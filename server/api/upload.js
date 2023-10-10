import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();

const serviceImgStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images/serviceImg');
    },
    filename: (_req, file, cb) => {
        cb(null, 'serviceImg_' + Date.now() + path.extname(file.originalname));
    },
});

const serviceImgUpload = multer({
    storage: serviceImgStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/service', serviceImgUpload.single('serviceImg_img'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/serviceImg/' + req.file.filename,
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
