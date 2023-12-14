import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";
import bcrypt from "bcrypt";

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
      if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
        let key = Date.now();
        let token = createToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key,
        });
        let refreshToken = createRefToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key,
        });
        await model.nguoi_dung.update(
          { ...checkUser.dataValues, refresh_token: refreshToken },
          {
            where: { nguoi_dung_id: checkUser.nguoi_dung_id },
          }
        );

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
      mat_khau: bcrypt.hashSync(mat_khau, 5),
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

// check token
export const tokenRefresh = async (req, res) => {
  try {
    let { token } = req.headers;
    // check token
    let check = checkToken(token);
    if (check != null && check.name != "TokenExpiredError") {
      responseData(res, "Token không hợp lệ", check.name, 401);
      return;
    }

    // lấy thông tin người dùng từ token
    let accessToken = decodeToken(token);
    let { nguoi_dung_id } = accessToken.data;
    let userDetail = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id,
      },
    });

    // check refresh token còn hạn hay không
    let checkRefreshToken = checkRefToken(userDetail.refresh_token);
    if (checkRefreshToken != null) {
      responseData(res, "", check.name, 401);
      return;
    }
    // check reftoken
    let refreshToken = decodeToken(userDetail.refresh_token);
    if (accessToken.data.key != refreshToken.data.key) {
      responseData(res, "", check.name, 401);
    }
    // tạo mới accessToken
    let newToken = createToken({
      nguoi_dung_id: userDetail.nguoi_dung_id,
      key: refreshToken.data.key,
    });
    responseData(res, "", newToken, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};

// logout

export const logout = async (req, res) => {
  try {
    // lấy thông tin người dùng từ token
    let accessToken = decodeToken(token);
    let { nguoi_dung_id } = accessToken.data;
    let userDetail = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id,
      },
    });

    // set rỗng cho refresh_token
    await model.nguoi_dung.update(
      { ...userDetail.dataValues, refresh_token: "" },
      {
        where: {
          nguoi_dung_id,
        },
      }
    );
    responseData(req, "logout thành công", "", 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};
