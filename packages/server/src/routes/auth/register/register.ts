import chalk from 'chalk';
import { Request, Response, Router } from 'express';

import { genPassword, issueJWT } from '../../../lib/utils';
import { User } from '../../../models/User';

export const registerRouter = Router();

registerRouter.post(
    '/',
    async (req: Request, res: Response): Promise<void> => {
        const { password, givenName, familyName, email } = req.body;
        const saltHash = genPassword(password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
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
                res.status(500).json({ success: false, msg: `server error`, err: err });
            }
        }
    },
);
