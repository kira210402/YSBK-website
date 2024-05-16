import express from "express";
import { create, deleteBook, getAll, getBookByBookCode, getBookByTitle, getBooksByGenre, getBooksByStatus, getOne, update } from "../controllers/book.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteBook);

// search by title || bookCode
router.get("/title/:title", getBookByTitle);
router.get("/bookcode/:bookCode", getBookByBookCode);

// filter books by genre || status
router.get("/genre/:genre", getBooksByGenre);
router.get("/status/:status", getBooksByStatus);

export default router;