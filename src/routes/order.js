// Import base
const express = require("express");

// Import controller
const orderController = require("../controllers/order");

// Import middleware
const { requireRole } = require("../middlewares/auth");

// Create router
const router = express.Router();

// Apply controller
router.get("/", requireRole("admin", "manager", "customer"), orderController.getAll);
router.post("/", requireRole("admin", "manager", "customer"), orderController.create);
router.get("/:orderId", requireRole("admin", "manager", "customer"), orderController.getById);
router.put("/:orderId", requireRole("admin"), orderController.updateById);
router.delete("/:orderId", requireRole("admin"), orderController.deleteById);

// Export router
module.exports = router;
