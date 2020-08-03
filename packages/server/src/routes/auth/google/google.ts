import Axios from 'axios';
import chalk from 'chalk';
import { Router } from 'express';

import { issueJWT } from '../../../lib/utils';
import { User } from '../../../models/User';

export const googleRouter = Router();

googleRouter.get(
    '/',
    async (req, res): Promise<void> => {
        try {
            // send Google token off to Google
            const verifyRes = await Axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.query.idToken}`);
            const { email, given_name, family_name } = verifyRes.data;
            User.findOne(
                {
                    email: email,
                },
                async (err, user) => {
                    if (err) {
                        res.status(401).json({
                            success: false,
                            error: err,
                        });
                    } else if (!user) {
                        const newUser = new User({
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
                                    self: `/user/${newUser._id}`,
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
                                res.status(409).json({ success: false, msg: `email already registered`, err: err });
                            } else {
                                console.log(chalk.red('There was a registration error:'));
                                console.log(err);
                                res.status(500).json({
                                    success: false,
                                    msg: `unable to register user at this time`,
                                    err: err,
                                });
                            }
                        }
                        // problem creating _id
                    } else {
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
                    }
                },
            );
            // problem verifying that token with Google
        } catch (err) {
            res.status(401).json({
                success: false,
                msg: 'token could not be verified by Google',
                err: err,
            });
        }
    },
);
