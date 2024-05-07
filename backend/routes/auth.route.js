import express from "express";
import { authFacebook, authGoogle, secret, login, register } from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();
import passport from "passport";
import { passportFacebook, passportGoogle, passportJwt, passportLocal } from "../middlewares/passport.js";

router.post("/register", validateBody(schemas.signUpSchema), register);
router.post("/login", validateBody(schemas.signInSchema), passport.authenticate("local", { session: false }), login);

// login with google
router.post("/google", passport.authenticate('google-plus-token', { session: false }), authGoogle);

// secret
router.get("/secret", passport.authenticate("jwt", { session: false }), secret);

export default router;