import express from "express";
import userRouter from "./userRouter.js";
import homePageRouter from "./homePageRouter.js";
import authRouter from "./authRouter.js";
import detailRouter from "./detailRouter.js";
import manageImgRouter from "./managerImgRouter.js";
import imgRouter from "./ImgRouter.js";

const rootRouter = express.Router();

// trang người dùng
rootRouter.use("/user", userRouter);

// trang đăng nhập,đăng ký
rootRouter.use("/auth", authRouter);

// trang chủ
rootRouter.use("/home", homePageRouter);

// trang chi tiết
rootRouter.use("/detail", detailRouter);

// trang quản lý ảnh
rootRouter.use("/manager", manageImgRouter);

// trang thêm ảnh
rootRouter.use("/img", imgRouter);

export default rootRouter;
