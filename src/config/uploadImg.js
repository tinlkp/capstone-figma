import multer from "multer";

let storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs",
  filename: (req, file, callback) => {
    let newNameImg = Date.now() + "_" + file.originalname;

    callback(null, newNameImg);
  },
});
let upload = multer({ storage });

export default upload;
