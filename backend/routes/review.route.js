import express from "express";
import { deleteReview, downvote, getHighest, getLatest, getOldest, update, upvote } from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.put("/upvote/:reviewId", verifyToken, upvote);
router.put("/downvote/:reviewId", verifyToken, downvote);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, deleteReview);

// filter review by highest, latest, oldest
router.get("/highest/:bookId", verifyToken, getHighest);
router.get("/latest/:bookId", verifyToken, getLatest);
router.get("/oldest/:bookId", verifyToken, getOldest);

export default router;