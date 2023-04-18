// Import base
const express = require("express");

// Import controller
const productController = require("../controllers/product");
const upload = require("../middlewares/upload");
const { requireRole } = require("../middlewares/auth");

// Create router
const router = express.Router();

// Apply controller
router.get("/", productController.getAll);
router.post("/", upload.array("imgs"), requireRole("admin"), productController.create);
router.get("/:productId", productController.getById);
router.put("/:productId", requireRole("admin"), productController.updateById);
router.delete("/:productId", requireRole("admin"), productController.deleteById);

// Export router
module.exports = router;
