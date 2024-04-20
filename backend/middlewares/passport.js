import passport from "passport";
import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy;
import { ExtractJwt } from "passport-jwt";
import { JWT_SECRET_KEY } from "../helpers/config-env.js";
import User from "../models/user.model.js";

export default passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
  secretOrKey: JWT_SECRET_KEY
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if(!user) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}))