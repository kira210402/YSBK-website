import express from "express";
import { addBook, addComment, addReview, create, deleteUser, getAll, getOne, update } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteUser);

// add a book to user's list
router.put("/add-book/:userId/:bookId", addBook);

// add review to a book
router.post("/add-review/:userId/:bookId", addReview);

// add comment to one review
router.post("/add-comment/:userId/:reviewId", addComment);
export default router;