import express from "express";
import { secret, signIn, signUp } from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();
import passport from "passport";
import passportConfig from "../middlewares/passport.js";

router.post("/sign-up", validateBody(schemas.signUpSchema), signUp);
router.post("/sign-in", validateBody(schemas.signInSchema), signIn);

router.get("/secret", passport.authenticate("jwt", { session: false }), secret);

export default router;