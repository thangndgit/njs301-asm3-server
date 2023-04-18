// Import base
const multer = require("multer");
// const path = require("path");

// Create storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

// Initialize Multer middleware
const upload = multer({ storage });

module.exports = upload;
