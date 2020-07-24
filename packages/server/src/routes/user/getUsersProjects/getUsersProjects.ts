import { Router } from 'express';
import { Project } from '../../../models/Project';
import { auth } from '../../../middleware/auth';

export const getUsersProjectsRouter = Router();

getUsersProjectsRouter.get('/:userId/projects', auth, async (req, res) => {
    if (req.params.userId === req.sub) {
        try {
            //get array of projects with user matching req.user.id; sort newest first
            const projects = await Project.find({ user: req.sub }).sort({
                updatedAt: -1,
            });
            //respond with that array
            res.json(projects);
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ success: false, msg: 'mysterious server error', err: err });
        }
    } else {
        res.status(403).send({ success: false, msg: 'resource unauthorized; mind your own business.' });
    }
});
