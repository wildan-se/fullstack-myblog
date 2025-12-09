const express = require("express");
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  registerAdminUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  [
    check("name", "Nama wajib diisi").notEmpty(),
    check("email", "Silakan sertakan email yang valid").isEmail(),
    check("password", "Kata sandi harus minimal 8 karakter").isLength({
      min: 8,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  authLimiter,
  [
    check("email", "Silakan sertakan email yang valid").isEmail(),
    check("password", "Kata sandi wajib diisi").notEmpty(),
  ],
  loginUser
);

router.get("/profile", protect, getUserProfile);

router.post(
  "/register-admin",
  authLimiter,
  [
    check("name", "Nama wajib diisi").notEmpty(),
    check("email", "Silakan sertakan email yang valid").isEmail(),
    check("password", "Kata sandi harus minimal 8 karakter").isLength({
      min: 8,
    }),
    check("adminSecretKey", "Kunci rahasia admin wajib diisi").notEmpty(),
  ],
  registerAdminUser
);

router.post(
  "/forgot-password",
  authLimiter,
  [check("email", "Silakan sertakan email yang valid").isEmail()],
  forgotPassword
);

router.put(
  "/reset-password/:resetToken",
  authLimiter,
  [
    check("password", "Kata sandi harus minimal 8 karakter").isLength({
      min: 8,
    }),
  ],
  resetPassword
);

module.exports = router;
