const httpStatus = require("http-status");
const multer = require("multer");
const ApiError = require("../utils/ApiError");
const imagekit = require('../lib/imagekitConfig'); // Import ImageKit config
const path = require('path');

// Filter file yang diperbolehkan
const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new ApiError(httpStatus.BAD_REQUEST, 'Only .png, .jpg, .jpeg, and .pdf formats are allowed!'), false);
  }
};

// Setup multer untuk menyimpan file di memori
const upload = multer({
  storage: multer.memoryStorage(), // Menyimpan file di memori
  fileFilter: multerFiltering,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5 MB
});

module.exports = upload;
