import { Router, Request, Response, NextFunction } from 'express';
import { validatePassword, genPassword, issueJWT } from '../lib/utils';
import User from '../models/User';
import auth from '../middleware/auth';
import axios from 'axios';
import chalk from 'chalk';

const router = Router();

const createID = async (url, idBase, match) => {
    try {
        const results = await User.find(match);
        const _id = `${url}/${idBase.toLowerCase()}${results.length > 0 ? results.length : ''}`;
        return _id;
    } catch (err) {
        return;
    }
};

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
                res.status(401).json({ success: false, msg: 'user not found' });
                return;
            } else {
                res.status(200).json({
                    success: true,
                    user: user,
                });
            }
        })
        .catch((err) => {
            next(err);
        });
});

// if Google verifies the JWT from the front-end, then find or create User
router.get(
    '/google',
    async (req, res): Promise<void> => {
        try {
            // send Google token off to Google
            const verifyRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.query.idToken}`);
            const { email, given_name, family_name } = verifyRes.data;
            // try to create the new user
            try {
                const _id = await createID('/user', `${given_name}${family_name}`, {
                    givenName: given_name,
                    familyName: family_name,
                });
                const newUser = new User({
                    _id: _id,
                    givenName: given_name,
                    familyName: family_name,
                    email: email,
                    provider: 'google',
                });
                // try to save newUser
                try {
                    await newUser.save();
                    console.log('A new User was saved:');
                    console.log(newUser);
                    const tokenObject = issueJWT(newUser);
                    res.status(200).json({
                        success: true,
                        user: {
                            _id: newUser._id,
                            givenName: newUser.givenName,
                            familyName: newUser.familyName,
                            email: newUser.email,
                            provider: newUser.provider,
                        },
                        token: tokenObject.token,
                        expiresIn: tokenObject.expires,
                    });
                    // problem saving newUser
                } catch (err) {
                    if (err.code === 11000) {
                        console.log(chalk.red('Attempted duplicate registration of email:'));
                        console.log(newUser);
                        res.status(401).json({ success: false, msg: `email already registered`, err: err });
                    } else {
                        console.log(chalk.red('There was a registration error:'));
                        console.log(err);
                        res.status(401).json({ success: false, msg: `not sure what happened there...`, err: err });
                    }
                }
                // problem creating _id
            } catch (err) {
                console.log(chalk.red('There was an error while attempting to create _id'));
                console.log(err);
                res.status(401).json({
                    success: false,
                    error: err,
                });
            }
            // problem verifying that token with Google
        } catch (err) {
            res.status(401).json({
                success: false,
                msg: err,
            });
        }
    },
);

// validate an existing user and issue a JWT
router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
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
                            _id: user._id,
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

router.post(
    '/register',
    async (req: Request, res: Response): Promise<void> => {
        const { password, givenName, familyName, email } = req.body;
        const saltHash = genPassword(password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        // try to create _id
        try {
            const _id = await createID('/user', `${givenName}${familyName}`, {
                givenName: givenName,
                familyName: familyName,
            });
            const newUser = new User({
                _id: _id,
                givenName: givenName,
                familyName: familyName,
                email: email,
                hash: hash,
                salt: salt,
                provider: 'local',
            });
            // try to save newUser
            try {
                await newUser.save();
                console.log(chalk.green('A new User was saved:'));
                console.log(newUser);
                const tokenObject = issueJWT(newUser);
                res.status(200).json({
                    success: true,
                    user: {
                        _id: newUser._id,
                        givenName: newUser.givenName,
                        familyName: newUser.familyName,
                        email: newUser.email,
                        provider: newUser.provider,
                    },
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires,
                });
                // problem saving newUser
            } catch (err) {
                if (err.code === 11000) {
                    console.log(chalk.red('Attempted duplicate registration of email:'));
                    console.log(newUser);
                    res.status(401).json({ success: false, msg: `email already registered`, err: err });
                } else {
                    console.log(chalk.red('There was a registration error:'));
                    console.log(err);
                    res.status(401).json({ success: false, msg: `not sure what happened there...`, err: err });
                }
            }
            // problem creating _id
        } catch (err) {
            console.log(chalk.red('There was an error while attempting to create _id'));
            console.log(err);
            res.status(401).json({
                success: false,
                error: err,
            });
        }
    },
);

export default router;
