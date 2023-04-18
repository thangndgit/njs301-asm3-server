// Import base
const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");

// Create schema
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    receiver: {
      full_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: Product,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    delivered: {
      type: Boolean,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model("Order", orderSchema);
