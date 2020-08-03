import { Request, Response, Router } from 'express';

import { auth } from '../../../middleware/auth';
import { User } from '../../../models/User';

export const deleteUserRouter = Router();

deleteUserRouter.delete('/', auth, async (req: Request, res: Response) => {
    try {
        await User.findByIdAndRemove(req.sub);
        res.status(200).json({ success: true, msg: 'user was deleted :(' });
    } catch (err) {
        res.status(401).json({ success: false, msg: 'user not found', err: err });
    }
});
