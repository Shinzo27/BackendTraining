import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../frontend/public/Uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
