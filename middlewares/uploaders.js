// const httpStatus = require("http-status");
// const multer = require("multer");
// const ApiError = require("../utils/ApiError");

// const multerFiltering = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true); // Izinkan file
//   } else {
//     cb(new ApiError(httpStatus.BAD_REQUEST, 'Only .png, .jpg, and .jpeg format allowed!'), false); // Tolak file
//   }
// };

// const upload = multer({
//   fileFilter: multerFiltering,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5 MB
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Lokasi penyimpanan file
//     },
//     filename: (req, file, cb) => {
//       const ext = file.mimetype.split('/')[1];
//       cb(null, `${Date.now()}.${ext}`); // Nama file yang unik
//     }
//   })
// });

// module.exports = upload;

// 
// LASTTT
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nama folder di Cloudinary
    format: async (req, file) => {
      // Menentukan format file berdasarkan ekstensi
      if (file.mimetype === 'application/pdf') {
        return 'pdf';
      }
      return 'auto'; // Format default untuk gambar
    },
    public_id: (req, file) => Date.now(), // Nama file unik
  },
});

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

const upload = multer({
  storage: storage,
  fileFilter: multerFiltering,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5 MB
});

module.exports = upload;
