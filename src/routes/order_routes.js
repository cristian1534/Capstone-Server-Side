const express = require("express");
const router = express.Router();
const { create_order, get_orders } = require("../controllers/order_controller");

router.post("/create-order", create_order);
router.get("/get-orders", get_orders);

module.exports = router;

