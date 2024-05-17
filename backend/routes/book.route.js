import express from "express";
import { create, deleteBook, getAll, getBookByBookCode, getBookByTitle, getBooksByGenre, getBooksByStatus, getOne, update } from "../controllers/book.controller.js";
import { verifyModAndAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getOne);
router.post("/", validateBody(schemas.bookSchema), verifyModAndAdmin, create);
router.put("/:id", verifyModAndAdmin, update);
router.delete("/:id", verifyModAndAdmin, deleteBook);

// search by title || bookCode
router.get("/title/:title", verifyToken, getBookByTitle);
router.get("/bookcode/:bookCode", verifyToken, getBookByBookCode);

// filter books by genre || status
router.get("/genre/:genre", verifyToken, getBooksByGenre);
router.get("/status/:status", verifyToken, getBooksByStatus);

export default router;