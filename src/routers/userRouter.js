import express from "express";
import {
  UpdateInfoUser,
  getUserDetail,
  upAvatar,
} from "../controllers/userController.js";
import upload from "../config/uploadImg.js";

const userRouter = express.Router();

userRouter.get("/get-user-detail", getUserDetail);

userRouter.put("/change-info", UpdateInfoUser);

userRouter.post("/upload-avatar", upload.single("anh_dai_dien"), upAvatar);
export default userRouter;
