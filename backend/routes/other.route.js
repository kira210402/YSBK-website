import express from "express";
import { getAbout } from "../controllers/about.controller.js";
import { getLeaderBoard } from "../controllers/leaderboard.controller.js";
const router = express.Router();

router.get("/about", getAbout);
router.get("/leaderboard", getLeaderBoard);

export default router;