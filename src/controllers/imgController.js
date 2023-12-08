import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

// post ảnh từ user

export const postImg = async (req, res) => {
  let { file } = req;

  compress_images(
    process.cwd() + "/public/imgs/" + file.filename,
    process.cwd() + "/public/video/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "10"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {}
  );
};
