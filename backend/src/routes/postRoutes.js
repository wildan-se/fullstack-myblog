const express = require("express");
const { check } = require("express-validator");
const {
  getPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
  addCommentToPost,
  updateComment,
  deleteComment,
  // Bulk Actions
  bulkAction,
  // Statistics
  incrementView,
  likePost,
  getPostStats,
} = require("../controllers/postController");
const {
  protect,
  admin,
  optionalProtect,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(optionalProtect, getPosts)
  .post(
    protect,
    admin,
    [
      check("title", "Judul wajib diisi").notEmpty(),
      check("content", "Konten wajib diisi").notEmpty(),
      check("category", "Kategori wajib diisi").notEmpty(),
    ],
    createPost
  );

// Bulk Actions Route
router.route("/bulk-action").post(protect, admin, bulkAction);

// Rute spesifik untuk mendapatkan postingan berdasarkan ID (untuk pengeditan admin, berbeda dari slug)
router.route("/id/:id").get(protect, admin, getPostById);

router.route("/:slug").get(getPostBySlug); // Rute publik untuk postingan yang diterbitkan

// Rute admin untuk operasi postingan spesifik berdasarkan ID
router
  .route("/:id")
  .put(
    protect,
    admin,
    [
      check("title", "Judul wajib diisi").notEmpty(),
      check("content", "Konten wajib diisi").notEmpty(),
      check("category", "Kategori wajib diisi").notEmpty(),
    ],
    updatePost
  )
  .delete(protect, admin, deletePost);

// Statistics Routes
router.route("/:id/increment-view").post(incrementView); // Public
router.route("/:id/like").post(protect, likePost); // Private
router.route("/:id/stats").get(protect, admin, getPostStats); // Admin

// --- Rute Komentar ---
router
  .route("/:postId/comments")
  .get(getPostComments)
  .post(
    protect,
    [check("content", "Konten komentar wajib diisi").notEmpty()],
    addCommentToPost
  );

// Rute untuk mengedit dan menghapus komentar
router
  .route("/:postId/comments/:commentId")
  .put(
    protect,
    [check("content", "Konten komentar tidak boleh kosong").notEmpty()],
    updateComment
  )
  .delete(protect, deleteComment);

module.exports = router;
