import express from "express";
import { getUser, upAvatar } from "../controllers/userController.js";
import upload from "../config/uploadImg.js";

const userRouter = express.Router();

userRouter.get("/get-user", getUser);

userRouter.post("/upload-avatar", upload.single("anh_dai_dien"), upAvatar);
export default userRouter;
