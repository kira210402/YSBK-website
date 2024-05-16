import express from "express";
import { create, deleteUser, getAll, getOne, update } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteUser);

export default router;