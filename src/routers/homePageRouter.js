import express from "express";
import { getImgList } from "../controllers/homeController.js";

const homePageRouter = express.Router();

homePageRouter.get("/get-img-list", getImgList);

export default homePageRouter;
