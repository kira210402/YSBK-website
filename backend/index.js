import express from "express";
import cors from "cors";
import { connectDB } from "./helpers/database.js";
import { PORT } from "./helpers/config-env.js";

const app = express();

// third-party middlewares
app.use(express.json());
app.use(cors());

// database
connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));