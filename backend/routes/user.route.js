import express from "express";
import { addComment, addReview, create, deleteUser, getAll, getOne, ratingBook, update } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getOne);
router.post("/", verifyAdmin, create);
router.put("/:id", validateBody(schemas.userUpdateSchema), verifyToken, update);
router.delete("/:id", verifyAdmin, deleteUser);

// add a book to user's list
// router.put("/add-book/:bookId", verifyToken, addBook);

// add review to a book
router.post("/add-review/:bookId", verifyToken, addReview);

// add comment to one review
router.post("/add-comment/:reviewId", verifyToken, addComment);

// rate a book
router.put("/rating/:bookId", verifyToken, ratingBook);
export default router;