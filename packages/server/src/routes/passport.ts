import { Router, Request, Response } from 'express';
import { issueJWT } from '../lib/utils';
import passport from 'passport';
const router = Router();

// Passport routes rely on middlewares which, in turn, rely on a config (../config/passport.ts)
// The middlewares are, of course, initialized in the main server.ts file.
// Passport has proven quite unnecessary.
// However, because it's documentation is terrible, I will preserve the routes/middleware/config for reference.

//
// example route using Passsport JWT verification middleware:
//
router.get('/jwtprotected', passport.authenticate('jwt', { session: false }), (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        msg: 'You are successfully authenticated to this route!',
    });
});

//
// example routes using Passport Google OAuth20 middleware
//

// not sure how this would ever be called, but just in case
router.get('/google/failed', (req, res) =>
    res.status(200).json({
        success: false,
    }),
);

// redirect to Google's auth
//
// Note that this domain must be added as an authorised Javascript origin for your app in Google API console
// (credentials/<application> --> Authorised Javascript origins
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// issue JWT for user found/created and appended to req in GoogleStrategy of config/passport.ts
//
// Note that this route must be added as an authorised redirect URI in Google API console
// (credentials/<application> --> Authorised reditrect URIs
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed', session: false }),
    function (req, res) {
        const tokenObject = issueJWT(req.user);
        res.status(200).json({
            success: true,
            user: req.user,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
        });
    },
);

export default router;
