import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

// thông tin hình ảnh và người tạo ảnh
export const imgDetail = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id,
      },
      include: ["nguoi_dung"],
    });
    responseData(res, "lấy chi tiết ảnh thành công", data, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};

// thông tin bình luận
export const commentDetai = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let data = await model.binh_luan.findAll({
      where: {
        hinh_id,
      },
    });
    responseData(res, "lấy bình luận thành công", data, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};

// check hình 


