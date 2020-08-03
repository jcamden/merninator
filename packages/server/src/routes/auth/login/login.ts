import { NextFunction, Request, Response, Router } from 'express';

import { issueJWT, validatePassword } from '../../../lib/utils';
import { User } from '../../../models/User';

export const loginRouter = Router();

// validate an existing user and issue a JWT
loginRouter.post('/', (req: Request, res: Response, next: NextFunction): void => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: 'user not found' });
                return;
            } else {
                const isValid = validatePassword(req.body.password, user.hash, user.salt);

                if (isValid) {
                    const tokenObject = issueJWT(user);
                    res.status(200).json({
                        success: true,
                        user: {
                            self: `/user/${user._id}`,
                            givenName: user.givenName,
                            familyName: user.familyName,
                            email: user.email,
                            provider: user.provider,
                        },
                        token: tokenObject.token,
                        expiresIn: tokenObject.expires,
                    });
                } else {
                    res.status(401).json({ success: false, msg: 'invalid password' });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});
