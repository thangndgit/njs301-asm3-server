// Import base
const express = require("express");

// Import controller
const roomController = require("../controllers/room");

// Create router
const router = express.Router();

// Apply controller
router.get("/", roomController.getAll);
router.get("/:roomId", roomController.getById);

// Export router
module.exports = router;
