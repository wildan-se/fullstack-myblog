const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const securityHeaders = require("./middlewares/securityHeaders");
const { apiLimiter } = require("./middlewares/rateLimiter");
const logger = require("./utils/logger");

dotenv.config({ path: ".env" });

const app = express();

// Trust proxy - Required for Railway, Heroku, etc.
// This allows Express to trust the X-Forwarded-* headers
// Deployed: 2025-12-09 (Version 1.0.1)
app.set('trust proxy', 1);
console.log(`[Config] Trust Proxy set to: ${app.get('trust proxy')}`);

// Security: Disable x-powered-by header
app.disable('x-powered-by');

// Production-specific middleware
if (process.env.NODE_ENV === 'production') {
  // Force HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// Security Headers (Helmet)
app.use(securityHeaders);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Injection Protection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    logger.warn(`[Security] Sanitized ${key} in ${req.path}`);
  },
}));

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? (process.env.FRONTEND_URL || '').split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn(`[Security] CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Rate Limiting for API routes
// Disabled in production due to Railway proxy issues
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/', apiLimiter);
  console.log('[Security] Rate limiting enabled for development');
} else {
  console.log('[Security] Rate limiting disabled for production (Railway compatibility)');
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
