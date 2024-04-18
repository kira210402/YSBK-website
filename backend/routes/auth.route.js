import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.post("/sign-up", validateBody(schemas.signUpSchema), signUp);
router.post("/sign-in", validateBody(schemas.signInSchema), signIn);

export default router;