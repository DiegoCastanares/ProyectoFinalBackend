const mongoose = require("mongoose");

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  product: {
    type: Array,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const cartService = mongoose.model(cartCollection, cartSchema);

module.exports = cartService;
