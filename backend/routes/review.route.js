import express from "express";
import { downvote, upvote } from "../controllers/review.controller.js";
const router = express.Router();

router.put("/upvote/:reviewId", upvote);
router.put("/downvote/:reviewId", downvote);

export default router;