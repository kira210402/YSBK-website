import express from "express";
import { create, deleteActivity, getActivitiesByStatus, getAll, getOne, update } from "../controllers/activity.controller.js";
import { verifyModAndAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.get("/", verifyToken, getAll);

// filter activities by status
router.get("/status/:status", verifyToken, getActivitiesByStatus);

router.get("/:id", verifyToken, getOne);

router.post("/", validateBody(schemas.activitySchema), verifyModAndAdmin, create);
router.put("/:id", validateBody(schemas.activityUpdateSchema), verifyModAndAdmin, update);
router.delete("/:id", verifyModAndAdmin, deleteActivity);

export default router;