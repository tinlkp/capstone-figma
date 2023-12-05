import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

export const getImgList = async (req, res) => {
  try {
    let imgList = await model.hinh_anh.findAll();
    responseData(res, "Lấy danh sách ảnh thành công", imgList, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};

