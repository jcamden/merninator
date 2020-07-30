import { Router } from 'express';
import { Project } from '../../../models/Project';
import { auth } from '../../../middleware/auth';
import { check, validationResult } from 'express-validator';

export const postProjectRouter = Router();

postProjectRouter.post('/', [auth, [check('title', 'title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    try {
        const newProject = new Project({
            // so "self" on the backend. Only in the response.
            user: req.sub,
            title,
            completed: false,
        });

        const project = await newProject.save();
        console.log(project);

        const resProject = {
            self: `/projects/${project._id}`,
            title: project.title,
            completed: project.completed,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        };

        // need to edit response to include self
        res.json({ success: true, project: resProject });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: 'server error', err: err });
    }
});
