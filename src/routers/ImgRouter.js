import express from "express";
import { postImg } from "../controllers/imgController.js";
import upload from "../config/uploadImg.js";

const imgRouter = express.Router();

// post thêm 1 ảnh của user
imgRouter.post("/upload", upload.single("duong_dan"), postImg);

export default imgRouter;
