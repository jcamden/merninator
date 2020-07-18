import { Router, Request, Response } from 'express';
import Project from '../../../models/Project';
import auth from '../../../middleware/auth';

const router = Router();

router.put('/:projectId', auth, async (req: Request, res: Response) => {
    try {
        const oldProject = await Project.findOne({ _id: req.params.projectId });
        if (oldProject.user === req.sub) {
            const newProject = { ...oldProject._doc, ...req.body };
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

export default router;
