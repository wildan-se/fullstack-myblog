// Migration script to add statistics fields to existing posts
// Run this once: node backend/src/migrations/addStatsToExistingPosts.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myblog';

async function migrateStats() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const postsCollection = db.collection('posts');

    // Update all posts that don't have stats fields
    const result = await postsCollection.updateMany(
      {
        $or: [
          { views: { $exists: false } },
          { likes: { $exists: false } },
          { tags: { $exists: false } }
        ]
      },
      {
        $set: {
          views: 0,
          likes: 0,
          tags: [],
          featured: false,
          order: 0
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} posts with statistics fields`);
    
    // Show sample of updated posts
    const samplePosts = await postsCollection.find({}).limit(3).toArray();
    console.log('\n📊 Sample posts:');
    samplePosts.forEach(post => {
      console.log(`- ${post.title}: views=${post.views}, likes=${post.likes}, tags=${post.tags?.length || 0}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Migration complete! Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateStats();
