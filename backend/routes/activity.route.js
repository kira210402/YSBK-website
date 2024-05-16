import express from "express";
import { create, deleteActivity, getAll, getOne, update } from "../controllers/activity.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteActivity);

export default router;