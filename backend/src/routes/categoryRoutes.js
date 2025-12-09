const express = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    protect,
    admin,
    [check("name", "Nama kategori wajib diisi").notEmpty()],
    createCategory
  );

// Bulk delete route
router.route("/bulk-delete").post(protect, admin, bulkDeleteCategories);

// Routes for updating and deleting categories by ID
router
  .route("/:id")
  .put(
    protect,
    admin,
    [check("name", "Nama kategori wajib diisi").notEmpty()],
    updateCategory
  )
  .delete(protect, admin, deleteCategory);

module.exports = router;
