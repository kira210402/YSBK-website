import express from "express";
import authController from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.post("/sign-up", validateBody(schemas.signUpSchema) , authController.signUp);
router.post("/sign-in", validateBody(schemas.signInSchema) , authController.signIn);

export default router;