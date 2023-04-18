// Import base
const mongoose = require("mongoose");

// Create schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  long_desc: {
    type: String,
    required: true,
  },
  remaining: {
    type: Number,
    required: true,
  },
  imgs: [
    {
      type: String,
      required: true,
    },
  ],
});

// Export model
module.exports = mongoose.model("Product", productSchema);
