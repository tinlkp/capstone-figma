import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";

import { responseData } from "../config/response.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

// lấy danh sách người dùng
export const getUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();
    responseData(res, "Thành công !!!", data, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};

// thông tin chi tiết của người dùng
export const getUserDetail = async (req, res) => {
  try {
    

  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};
