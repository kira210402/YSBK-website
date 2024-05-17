import express from "express";
import { downvote, upvote } from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.put("/upvote/:reviewId", verifyToken, upvote);
router.put("/downvote/:reviewId", verifyToken, downvote);

export default router;