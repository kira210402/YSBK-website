import express from "express";
import { addBook, addComment, addReview, create, deleteUser, getAll, getOne, update } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getOne);
router.post("/", verifyAdmin, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyAdmin, deleteUser);

// add a book to user's list
router.put("/add-book/:userId/:bookId", verifyToken, addBook);

// add review to a book
router.post("/add-review/:userId/:bookId", verifyToken, addReview);

// add comment to one review
router.post("/add-comment/:userId/:reviewId", verifyToken, addComment);
export default router;