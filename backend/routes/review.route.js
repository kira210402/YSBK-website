import express from "express";
import { addComment, downvote, upvote } from "../controllers/review.controller.js";
const router = express.Router();

router.put("/upvote/:reviewId", upvote);
router.put("/downvote/:reviewId", downvote);
router.put("/add-comment/:reviewId", addComment);

export default router;