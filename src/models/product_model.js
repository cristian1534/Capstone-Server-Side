const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image_url: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);
