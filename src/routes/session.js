// Import base
const express = require("express");

// Import controller
const sessionController = require("../controllers/session");

// Create router
const router = express.Router();

// Apply controller
router.post("/", sessionController.create);
router.get("/", sessionController.get);
router.delete("/", sessionController.delete);

// Export router
module.exports = router;
