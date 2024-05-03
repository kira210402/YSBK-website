import express from "express";
import { authGoogle, secret, signIn, signUp } from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();
import passport from "passport";
import { passportGoogle, passportJwt, passportLocal } from "../middlewares/passport.js";

router.post("/sign-up", validateBody(schemas.signUpSchema), signUp);
router.post("/sign-in", validateBody(schemas.signInSchema), passport.authenticate("local", { session: false }), signIn);
router.post("/google", passport.authenticate('google-plus-token', { session: false }), authGoogle);

router.get("/secret", passport.authenticate("jwt", { session: false }), secret);

export default router;