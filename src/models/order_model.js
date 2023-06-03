const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  id: {
    type: String, 
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  user: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
