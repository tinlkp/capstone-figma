import express from "express";
import { commentDetai, imgDetail } from "../controllers/detailController.js";

const detailRouter = express.Router();

// thông tin chi tiết ảnh và người dùng
detailRouter.get("/img/:hinh_id", imgDetail);

// thông tin bình luận
detailRouter.get("/comment/:hinh_id", commentDetai);



export default detailRouter;
