import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";
import compress_images from "compress-images";
import { decodeToken } from "../config/jwt.js";
import fs from "fs";

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
    // tối ưu hình ảnh
    compress_images(
      process.cwd() + "/public/imgs/" + file.filename,
      process.cwd() + "/public/imgs/avatar/",
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "10"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      {
        gif: {
          engine: "gifsicle",
          command: ["--colors", "64", "--use-col=web"],
        },
      },
      function (error, completed, statistic) {
        // nếu thành công thì xóa ảnh chưa được tối ưu đi
        console.log(error);
        if (completed) {
          const imgUnOptimized =
            process.cwd() + "/public/imgs/" + file.filename;
          fs.unlink(imgUnOptimized, (err) => {
            console.log(err);
          });
        }
      }
    );
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
