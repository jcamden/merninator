import { Router } from 'express';

import { auth } from '../../../middleware/auth';
import { Project } from '../../../models/Project';

export const getProjectRouter = Router();

getProjectRouter.get('/:projectId', auth, async (req, res) => {
    try {
        //get array of projects with user matching req.user.id; sort newest first
        const project = await Project.findOne({ user: req.sub, _id: req.params.projectId }).sort({
            updatedAt: -1,
        });
        //respond with that array
        // need to edit response to include self
        res.json({ success: true, project: project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: 'mysterious server error', err: err });
    }
});
