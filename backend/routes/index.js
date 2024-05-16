import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import activityRouter from "./activity.route.js";
import bookRouter from "./book.route.js";
import otherRouter from "./other.route.js";
import reviewRouter from "./review.route.js";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/books", bookRouter);
  app.use("/activities", activityRouter);
  app.use("/other", otherRouter);
  app.use("/reviews", reviewRouter);
}

export default route;
