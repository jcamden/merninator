import { Router } from 'express';

import { id2Self } from '../../../lib/utils';
import { auth } from '../../../middleware/auth';
import { Project } from '../../../models/Project';

export const getUsersProjectsRouter = Router();

getUsersProjectsRouter.get('/:userId/projects', auth, async (req, res) => {
    if (req.params.userId === req.sub) {
        try {
            //get array of projects with user matching req.user.id; sort newest first
            const projects = await Project.find({ user: req.sub }).sort({
                updatedAt: -1,
            });

            const terrificallySimpleJSONifiedProjects = projects.map((project) => id2Self(project._doc, '/project'));

            //respond with that array
            res.json(terrificallySimpleJSONifiedProjects);
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ success: false, msg: 'mysterious server error', err: err });
        }
    } else {
        res.status(403).send({ success: false, msg: 'resource unauthorized; mind your own business.' });
    }
});
