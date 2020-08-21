// import fs from 'fs';
// import path from 'path';
import { PassportStatic } from 'passport';
// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { User } from '../models/User';

// const pathToKey = path.join(__dirname, '../../security/jwt/', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// full passport options object
// (options from jsonwebtoken package: secretOrKey, issuer, audience, algorithms, and jsonWebTokenOptions (yes, confusing))
// const passportJWTOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: PUB_KEY,
//   issuer: 'enter issuer here',
//   audience: 'enter audience here',
//   algorithms: ['RS256'],
//   ignoreExpiration: false,
//   passReqToCallback: false,
//   jsonWebTokenOptions: {
//     complete: false,
//     clockTolerance: '',
//     maxAge: '2d',
//     clockTimestamp: '100',
//     nonce: 'string here for OpenID',
//   },
// };

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY,
//     algorithms: ['RS256'],
// };

const googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
};

// app.js will pass the global passport object here, and this function will configure it
export const configPassport = (passport: PassportStatic): void => {
    passport.use(
        new GoogleStrategy(googleOptions, (req, accessToken, refreshToken, profile, done) => {
            User.findOne(
                {
                    email: profile.emails[0].value,
                },
                (err, user) => {
                    if (err) {
                        console.log('THERE WAS AN ERROR');
                        return done(err);
                    }
                    //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                    if (!user) {
                        console.log('NEW USER WAS CREATED');
                        user = new User({
                            email: profile.emails[0].value,
                        });
                        user.save((err) => {
                            if (err) console.log(err);
                            return done(err, user);
                        });
                    } else {
                        console.log('USER WAS FOUND');
                        //found user. Return
                        return done(err, user);
                    }
                },
            );
        }),
    );
};
