import express from "express";
import { create, deleteActivity, getAll, getOne, update } from "../controllers/activity.controller.js";
import { verifyModAndAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getOne);
router.post("/", validateBody(schemas.activitySchema), verifyModAndAdmin, create);
router.put("/:id", verifyModAndAdmin, update);
router.delete("/:id", verifyModAndAdmin, deleteActivity);

export default router;