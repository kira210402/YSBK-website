import express from "express";
import { getAbout, getLeaderBoard, search } from "../controllers/other.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/about", verifyToken, getAbout);
router.get("/leaderboard", verifyToken, getLeaderBoard);
router.get("/search/:query", verifyToken, search);

export default router;