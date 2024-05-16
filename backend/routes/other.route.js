import express from "express";
import { getAbout, getLeaderBoard, search } from "../controllers/other.controller.js";
const router = express.Router();

router.get("/about", getAbout);
router.get("/leaderboard", getLeaderBoard);
router.post("/search/:query", search);

export default router;