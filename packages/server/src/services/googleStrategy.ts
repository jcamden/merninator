import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

const serverUrl = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${serverUrl}${process.env.GOOGLE_CALLBACK_URL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const oldUser = await User.findOne({ email: profile._json.email });
        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const newUser = await new User({
          provider: 'google',
          googleId: profile.id,
          username: `user${profile.id}`,
          email: profile._json.email,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          avatar: profile.picture,
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    },
  ),
);
