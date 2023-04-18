// Import base
const express = require("express");

// Import controller
const mailController = require("../controllers/mail");

// Import middleware
const { requireRole } = require("../middlewares/auth");

// Create router
const router = express.Router();

// Apply controller
router.post("/send-order", requireRole("customer", "manager", "admin"), mailController.sendOrder);

// Export router
module.exports = router;
