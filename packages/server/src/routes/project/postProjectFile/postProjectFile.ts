import { Router } from 'express';

import { auth } from '../../../middleware/auth';

export const postProjectFileRouter = Router();

postProjectFileRouter.post('/upload/:id', auth, (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'nothing chewed' });
    }

    const file = req.files.file;
    file.mv(__dirname + `/../public/${req.params.id}.pdf`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }
        res.json({
            fileName: file.name,
            filePath: `http://localhost:5000/public/${file.name}`,
        });
    });
});
