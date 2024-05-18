import express from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { deleteComment, update } from "../controllers/comment.controller.js";
const router = express.Router();

router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, deleteComment);

export default router;