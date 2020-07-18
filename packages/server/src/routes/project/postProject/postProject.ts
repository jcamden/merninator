import { Router } from 'express';
import Project from '../../../models/Project';
import auth from '../../../middleware/auth';
import { check, validationResult } from 'express-validator';

const router = Router();

router.post('/', [auth, [check('title', 'title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    try {
        const newProject = new Project({
            user: req.sub,
            title,
            completed: false,
        });

        const project = await newProject.save();

        res.json({ success: true, project: project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: 'server error', err: err });
    }
});

export default router;
