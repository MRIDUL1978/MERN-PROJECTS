const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/check-sessions", authController.checkSessions);
authRouter.post("/signup", authController.postSignUp);
authRouter.post("/signin", authController.postSignIn);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
