import { Router, Request, Response } from 'express';
import { Project } from '../../../models/Project';
import { auth } from '../../../middleware/auth';

export const deleteProjectRouter = Router();

deleteProjectRouter.delete('/', auth, async (req: Request, res: Response) => {
    try {
        await Project.findByIdAndRemove(req.sub);
        res.status(200).json({ success: true, msg: 'project was deleted :(' });
    } catch (err) {
        res.status(401).json({ success: false, msg: 'project not found', err: err });
    }
});
