import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import fs from 'fs';
import path from 'path';
import { PassportStatic } from 'passport';
import User from '../models/User';

const pathToKey = path.join(__dirname, '../../security/jwt/', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

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
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

// app.js will pass the global passport object here, and this function will configure it
export default (passport: PassportStatic) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function(jwtPayload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwtPayload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }),
  );
};