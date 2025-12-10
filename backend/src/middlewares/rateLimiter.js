const rateLimit = require('express-rate-limit');
// Last updated: 2025-12-10 07:40

// Detect environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Login endpoints - strict limit (security critical)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 20 : 5, // More lenient in dev
  message: {
    error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
  validate: false,
});

// Registration endpoints - moderate limit (allow more attempts for testing)
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 50 : 10, // Allow more registrations than logins
  message: {
    error: 'Terlalu banyak percobaan registrasi. Silakan coba lagi dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  validate: false,
});

// Password reset endpoints - moderate limit
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 30 : 5, // More lenient in dev
  message: {
    error: 'Terlalu banyak permintaan reset password. Silakan coba lagi dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  validate: false,
});

// General API - moderate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 500 : 100, // Much higher in dev
  message: {
    error: 'Terlalu banyak request dari IP ini. Silakan coba lagi nanti.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
});

// Upload endpoints - very strict
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDevelopment ? 50 : 10, // More uploads allowed in dev
  message: {
    error: 'Terlalu banyak upload. Silakan coba lagi dalam 1 jam.'
  },
  validate: false,
});

console.log(`🔒 Rate Limiter initialized for ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'} mode`);
console.log(`   - Login: ${isDevelopment ? 20 : 5} attempts per 15 min`);
console.log(`   - Register: ${isDevelopment ? 50 : 10} attempts per 15 min`);
console.log(`   - Password Reset: ${isDevelopment ? 30 : 5} attempts per 15 min`);

module.exports = { 
  loginLimiter, 
  registerLimiter, 
  passwordResetLimiter,
  apiLimiter, 
  uploadLimiter 
};
