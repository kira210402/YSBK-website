import express from "express";
import { authGoogle, secret, login, register } from "../controllers/auth.controller.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();
import passport from "passport";
import { CLIENT_URL } from "../helpers/config-env.js";
import { passportGoogle, passportJwt, passportLocal } from "../middlewares/passport.js";

router.post("/register", validateBody(schemas.signUpSchema), register);
router.post("/login", validateBody(schemas.signInSchema), passport.authenticate("local"), login);
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "login failed!",
  })
});

router.get("login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "login successfully!",
      user: req.user,
    })
  } else {
    res.status(403).json({ error: true, message: "Not authorized!" })
  }
})

// login with google
router.get("/google", passport.authenticate('google', { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed",
}))

// secret
router.get("/secret", passport.authenticate("jwt", { session: false }), secret);

export default router;