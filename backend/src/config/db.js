const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined. Please set MONGODB_URI or MONGO_URI in environment variables.');
    }

    const conn = await mongoose.connect(mongoURI, {
      // These options are no longer needed in Mongoose 6+, but included for compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    console.error('Please check:');
    console.error('1. MONGODB_URI environment variable is set');
    console.error('2. MongoDB Atlas IP whitelist includes 0.0.0.0/0');
    console.error('3. Database user credentials are correct');
    process.exit(1);
  }
};

module.exports = connectDB;
