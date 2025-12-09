const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middlewares/authMiddleware");
const { uploadLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = "uploads/";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Uploads directory created");
}

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Sanitize filename to prevent path traversal
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(sanitizedName)}`
    );
  },
});

// Fungsi untuk memfilter jenis file yang diizinkan (hanya gambar)
function checkFileType(file, cb) {
  const filetypes = /jpe?g|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Hanya gambar (JPG, JPEG, PNG, GIF, WEBP) yang diizinkan!");
  }
}

// Inisialisasi Multer dengan konfigurasi penyimpanan dan filter file
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Batasi ukuran file hingga 5MB
});

// Rute POST untuk upload gambar
// protect, admin: Middleware untuk memastikan hanya admin yang bisa mengupload
// uploadLimiter: Rate limiting untuk mencegah spam upload
// upload.single('image'): Middleware Multer untuk menangani upload satu file
router.post(
  "/",
  protect,
  admin,
  uploadLimiter, // Rate limiting: 10 uploads per hour
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (req.file) {
      res.send({
        message: "Gambar berhasil diupload",
        image: `/uploads/${req.file.filename}`,
      });
    } else {
      res.status(400);
      throw new Error(
        "Tidak ada file gambar yang diupload atau format tidak didukung."
      );
    }
  })
);

module.exports = router;
