import { Request, Response, Router } from 'express';

import { auth } from '../../../middleware/auth';
import { Project } from '../../../models/Project';

export const deleteProjectRouter = Router();

deleteProjectRouter.delete('/', auth, async (req: Request, res: Response) => {
    try {
        await Project.findByIdAndRemove(req.sub);
        res.status(200).json({ success: true, msg: 'project was deleted :(' });
    } catch (err) {
        res.status(401).json({ success: false, msg: 'project not found', err: err });
    }
});
