import express from "express";
import cors from "cors";
import { connectDB } from "./helpers/database.js";
import { PORT } from "./helpers/config-env.js";
import cookieSession from "cookie-session";
import passport from "passport";
import routes from "./routes/index.js";
import { createServer } from "http";
import { initializeSocket } from "./configs/socket.config.js";


const app = express();
const httpServer = createServer(app);

const io = initializeSocket(httpServer);

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

// to fix the error req.session.regenerate is not a function 
// when using passport version 0.7.0 & still using cookie-session
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb()
    }
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb()
    }
  }
  next()
})
// 

app.use(passport.initialize());
app.use(passport.session());
// database
connectDB();


// routes
routes(app);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));