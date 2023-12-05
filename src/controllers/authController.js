import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { createToken } from "../config/jwt.js";

let model = initModels(sequelize);

// đăng nhập
export const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkUser) {
      if (mat_khau == checkUser.mat_khau) {
        let key = Date.now();
        let token = createToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key,
        });

        
        responseData(res, "Đăng nhập thành công !!!", token, 200);
      } else {
        responseData(res, "Mật khẩu không đúng", "", 400);
      }
    } else {
      responseData(res, "Email không đúng", "", 400);
    }
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};

// đăng ký
export const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkUser) {
      responseData(res, "Email đã được đăng ký", "", 400);
      return;
    }
    let newData = {
      email,
      mat_khau,
      ho_ten,
      tuoi,
      anh_dai_dien: "",
    };
    await model.nguoi_dung.create(newData);
    responseData(res, "Đăng ký thành công !!!", newData, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};
