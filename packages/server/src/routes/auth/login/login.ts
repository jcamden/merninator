import { Router, Request, Response, NextFunction } from 'express';
import { validatePassword, issueJWT } from '../../../lib/utils';
import User from '../../../models/User';

const router = Router();

// validate an existing user and issue a JWT
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
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

export default router;
