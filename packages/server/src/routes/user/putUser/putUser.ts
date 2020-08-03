import { Request, Response, Router } from 'express';

import { auth } from '../../../middleware/auth';
import { User } from '../../../models/User';

export const putUserRouter = Router();

// You could do a get route here to expose users if you were doing, like, a social media network or something.

putUserRouter.put('/', auth, async (req: Request, res: Response) => {
    try {
        // find old user via token
        const oldUser = await User.findOne({ _id: req.sub });
        // console.log(oldUser);
        const newUser = { ...oldUser._doc, ...req.body };
        console.log(newUser);
        const user = await User.findByIdAndUpdate(req.sub, { $set: newUser }, { new: true });
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
        res.status(401).json({ success: false, msg: 'user not found', err: err });
    }
});
