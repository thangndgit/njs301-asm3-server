// Import base
const mongoose = require("mongoose");

// Create schema
const roomSchema = mongoose.Schema({
  messages: [
    {
      from: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

// Export model
module.exports = mongoose.model("Room", roomSchema);
