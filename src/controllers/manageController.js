import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);

// thông tin người dùng
export const getUserDetail = async (req, res) => {
  try {
    // lấy nguoi_dung_id dựa trên token đã đăng nhập
    let { token } = req.headers;
    let dToken = decodeToken(token);
    let { nguoi_dung_id } = dToken.data;

    // lấy thông tin user
    let userDetail = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id,
      },
    });

    responseData(res, "lấy thông tin thành công", userDetail, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};

// lấy danh sách ảnh đã tạo
export const listImg = async (req, res) => {
  try {
    // lấy nguoi_dung_id dựa trên token đã đăng nhập
    let { token } = req.headers;
    let dToken = decodeToken(token);
    let { nguoi_dung_id } = dToken.data;

    // lấy danh sách ảnh của user đó
    const imgList = await model.hinh_anh.findAll({
      where: {
        nguoi_dung_id,
      },
    });

    responseData(res, "lấy danh sách ảnh thành công", imgList, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};
// lấy danh sách ảnh đã lưu
export const listImgSave = async (req, res) => {
  try {
    // lấy nguoi_dung_id dựa trên token đã đăng nhập
    let { token } = req.headers;
    let dToken = decodeToken(token);
    let { nguoi_dung_id } = dToken.data;

    // lấy danh sách ảnh của user đó
    const imgList = await model.luu_anh.findAll({
      where: {
        nguoi_dung_id,
      },
    });

    responseData(res, "lấy danh sách ảnh thành công", imgList, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};

// xóa ảnh đã tạo
export const deleteImg = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    const findCommentImg = await model.binh_luan.findAll({
      where: {
        hinh_id,
      },
    });

    // const findImg = await model.hinh_anh.findOne({
    //   where: {
    //     hinh_id,
    //   },
    // });

    // await findImg.destroy();

    responseData(res, "xóa thành công", findCommentImg, 200);
  } catch (exception) {
    responseData(res, "lỗi ...", exception.message, 500);
  }
};
