const multer = require("multer");
const crypto = require("crypto");
const path = require("node:path");
const { BadRequestError } = require("../errors/custom.errors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/promo");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(16).toString("hex")}${ext}`);
  },
});

const maxSize = 3 * 1024 * 1024;

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new BadRequestError("Gagal, Hanya Foto yang diperbolehkan."));
  }
}

const uploadPromoImage = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

module.exports = uploadPromoImage;
