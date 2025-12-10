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
const { 
  loginLimiter, 
  registerLimiter, 
  passwordResetLimiter 
} = require("../middlewares/rateLimiter");

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
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
  loginLimiter,
  [
    check("email", "Silakan sertakan email yang valid").isEmail(),
    check("password", "Kata sandi wajib diisi").notEmpty(),
  ],
  loginUser
);

router.get("/profile", protect, getUserProfile);

router.post(
  "/register-admin",
  registerLimiter,
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
  passwordResetLimiter,
  [check("email", "Silakan sertakan email yang valid").isEmail()],
  forgotPassword
);

router.put(
  "/reset-password/:resetToken",
  passwordResetLimiter,
  [
    check("password", "Kata sandi harus minimal 8 karakter").isLength({
      min: 8,
    }),
  ],
  resetPassword
);

module.exports = router;
