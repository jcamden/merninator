import { Request, Response, Router } from 'express';

import { auth } from '../../../middleware/auth';
import { Project } from '../../../models/Project';

export const putProjectRouter = Router();

putProjectRouter.put('/:projectId', auth, async (req: Request, res: Response) => {
    try {
        const oldProject = await Project.findOne({ _id: req.params.projectId });
        console.log(req.sub);
        console.log(oldProject.user);
        console.log(oldProject.user == req.sub);
        //triple equals returns false; one of them must not be a string. Too lazy to look into it. Double equals should be fine for this purpose.
        if (oldProject.user == req.sub) {
            console.log(req.body);
            const newProject = { ...oldProject._doc, ...req.body };
            console.log(newProject);
            const project = await Project.findByIdAndUpdate(req.params.projectId, { $set: newProject }, { new: true });
            res.status(200).json({
                success: true,
                project: {
                    self: `/project/${project._id}`,
                    user: project.user,
                    title: project.title,
                    completed: project.completed,
                    createdAt: project.createdAt,
                    updatedAt: project.updatedAt,
                    _v: project._v,
                },
            });
        } else {
            // funny message for potential hackers: "successfully tracked client MAC address"
            res.status(403).json({
                success: false,
                msg: 'успешно отследил MAC-адрес клиента',
            });
        }
    } catch (err) {
        res.status(404).json({ success: false, msg: 'project not found', err: err });
    }
});
