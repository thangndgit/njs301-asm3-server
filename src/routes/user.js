// Import base
const express = require("express");

// Import controller
const userController = require("../controllers/user");

// Create router
const router = express.Router();

// Apply controller
router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:userId", userController.getById);
router.put("/:userId", userController.updateById);
router.delete("/:userId", userController.deleteById);

// Export router
module.exports = router;
