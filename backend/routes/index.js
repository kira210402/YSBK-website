import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import activityRouter from "./activity.route.js";
import bookRouter from "./book.route.js";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/books", bookRouter);
  app.use("/activities", activityRouter);
}

export default route;
