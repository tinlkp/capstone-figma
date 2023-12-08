import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";
import compress_images from "compress-images";
import { decodeToken } from "../config/jwt.js";

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
// up avatar cho user
export const upAvatar = async (req, res) => {
  try {
    let { file } = req;

    let { token } = req.headers;

    let accessToken = decodeToken(token);
    let { nguoi_dung_id } = accessToken.data;

    let getUser = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id,
      },
    });
    getUser.anh_dai_dien = file.filename;

    await model.nguoi_dung.update(getUser.dataValues, {
      where: {
        nguoi_dung_id,
      },
    });

    responseData(res, "Upload ảnh đại diện thành công!!!", file.filename, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};
