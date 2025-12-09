const mongoose = require("mongoose");

const RevisionSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: String,
    status: String,
    seoTitle: String,
    metaDescription: String,
    focusKeyword: String,
    tags: [String],
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    changeDescription: {
      type: String,
      default: "Auto-saved revision",
    },
  },
  { timestamps: true }
);

// Index for faster queries
RevisionSchema.index({ post: 1, createdAt: -1 });

const Revision = mongoose.model("Revision", RevisionSchema);
module.exports = Revision;
