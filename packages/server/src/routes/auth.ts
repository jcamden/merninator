import { Router, Request, Response, NextFunction } from 'express';
import { validatePassword, genPassword, issueJWT } from '../lib/utils';
import User from '../models/User';
import auth from '../middleware/auth';
import axios from 'axios';

const router = Router();

// Here is an example of using custom JWT validation middleware (vs. Passport)
// This is the middleware used in the root .../auth route (below)

// router.get('/customjwtprotected', auth, (_req: Request, res: Response) => {
//     res.status(200).json({
//         success: true,
//         msg: 'You are successfully authenticated to this route!',
//     });
// });

router.get('/', auth, (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ _id: req.sub })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: 'could not find user' });
                return;
            } else {
                const userRes = {
                    _id: user._id,
                };

                res.status(200).json({
                    success: true,
                    user: userRes,
                });
            }
        })
        .catch((err) => {
            next(err);
        });
});

// if Google verifies the JWT from the front-end, then find or create User
router.get('/google', async (req, res) => {
    try {
        const verifyRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.query.idToken}`);
        User.findOne(
            {
                email: verifyRes.data.email,
            },
            (err, user) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        error: err,
                    });
                } else if (!user) {
                    user = new User({
                        email: verifyRes.data.email,
                        // some options to think about for the future
                        // username: profile.username,
                        // provider: 'google',
                        // account: something
                    });
                    user.save(function (err) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                            });
                        }
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        user: user,
                    });
                }
            },
        );
    } catch (err) {
        res.status(401).json({
            success: false,
            msg: err,
        });
    }
});

// validate an existing user and issue a JWT
router.post('/login', function (req: Request, res: Response, next: NextFunction): void {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: 'could not find user' });
                return;
            } else {
                const isValid = validatePassword(req.body.password, user.hash, user.salt);

                if (isValid) {
                    const tokenObject = issueJWT(user);

                    res.status(200).json({
                        success: true,
                        user: { _id: user._id, email: user.email },
                        token: tokenObject.token,
                        expiresIn: tokenObject.expires,
                    });
                } else {
                    res.status(401).json({ success: false, msg: 'you entered the wrong password' });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/register', function (req: Request, res: Response, next: NextFunction): void {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        email: req.body.email,
        hash: hash,
        salt: salt,
    });

    try {
        newUser.save().then((user) => {
            const tokenObject = issueJWT(user);
            res.status(200).json({
                success: true,
                user: user._id,
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
            });
        });
    } catch (err) {
        next(err);
        // res.json({ success: false, msg: err });
    }
});

export default router;
