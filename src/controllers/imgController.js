import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";
import compress_images from "compress-images";
import fs from "fs";

let model = initModels(sequelize);

// post ảnh từ user

export const postImg = async (req, res) => {
  try {
    let { file } = req;
    // tối ưu hình ảnh
    compress_images(
      process.cwd() + "/public/imgs/" + file.filename,
      process.cwd() + "/public/imgs/image/",
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
    let { mota, ten_hinh } = req.body;

    let imgData = {
      ten_hinh,
      duong_dan: file.filename,
      mo_ta: mota,
      nguoi_dung_id,
    };
    await model.hinh_anh.create(imgData);

    responseData(res, "Tải ảnh thành công", imgData, 200);
  } catch (exception) {
    responseData(res, "Lỗi ...", exception.message, 500);
  }
};
