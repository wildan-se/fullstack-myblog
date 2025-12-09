const rateLimit = require('express-rate-limit');
// Last updated: 2025-12-09 22:23

// Auth endpoints - strict limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  // Disable ALL validations for Railway compatibility
  validate: false,
});

// General API - moderate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: {
    error: 'Terlalu banyak request dari IP ini. Silakan coba lagi nanti.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Disable ALL validations for Railway compatibility
  validate: false,
});

// Upload endpoints - very strict
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  message: {
    error: 'Terlalu banyak upload. Silakan coba lagi dalam 1 jam.'
  },
  // Disable ALL validations for Railway compatibility
  validate: false,
});

module.exports = { authLimiter, apiLimiter, uploadLimiter };
