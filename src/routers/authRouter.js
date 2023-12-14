import express from "express";
import {
  login,
  logout,
  signUp,
  tokenRefresh,
} from "../controllers/authController.js";

const authRouter = express.Router();

// đăng nhập
authRouter.post("/login", login);

// đăng ký
authRouter.post("/signup", signUp);

// checkToken
authRouter.post("/token-ref", tokenRefresh);

// logout
authRouter.post("/logout", logout);

export default authRouter;
