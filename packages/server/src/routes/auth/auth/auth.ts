import { Request, Response, Router } from 'express';

import { auth } from '../../../middleware/auth';
import { User } from '../../../models/User';

export const authRootRouter = Router();

authRootRouter.get('/', auth, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.sub });
        res.status(200).json({
            success: true,
            user: {
                self: `/user/${user._id}`,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                provider: user.provider,
            },
        });
    } catch (err) {
        res.status(404).json({ success: false, msg: 'user not found', err: err });
    }
});
