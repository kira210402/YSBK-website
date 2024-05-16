import express from "express";
import { create, deleteBook, getAll, getOne, update } from "../controllers/book.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteBook);

export default router;