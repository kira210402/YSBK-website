import passport from "passport";
import passportJWT from "passport-jwt";
const JwtStrategy = passportJWT.Strategy;
import { ExtractJwt } from "passport-jwt";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET_KEY } from "../helpers/config-env.js";
import User from "../models/user.model.js";
import ppLocal from "passport-local";
const LocalStrategy = ppLocal.Strategy;
import GooglePassport from "passport-google-oauth20";
const GoogleStrategy = GooglePassport.Strategy;

// passport jwt
export const passportJwt = passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
  secretOrKey: JWT_SECRET_KEY
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// passport google
export const passportGoogle = passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback",
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // check whether this current user exists in our databases
    const existedUser = await User.findOne({ authGoogleId: profile.id, authType: "google" });

    if (existedUser) return done(null, existedUser);

    // if new account
    const newUser = new User({
      authType: "google",
      email: profile.emails[0].value,
      authGoogleId: profile.id
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
}));


// passport local
export const passportLocal = passport.use(new LocalStrategy({
  usernameField: "email",
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return done(null, false);

    const validPassword = await user.isValidPassword(password);

    if (!validPassword) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})
