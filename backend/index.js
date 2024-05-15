import express from "express";
import cors from "cors";
import { connectDB } from "./helpers/database.js";
import { PORT } from "./helpers/config-env.js";
import authRoute from "./routes/auth.route.js";
import cookieSession from "cookie-session";
import passport from "passport";

const app = express();

// third-party middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(cookieSession({
  name: "session",
  keys: ["ysbk"],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());
// database
connectDB();


// routes
app.use("/auth", authRoute);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));