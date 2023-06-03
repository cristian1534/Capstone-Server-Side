const express = require("express");
const router = express.Router();
const {
  create_product,
  get_products,
  get_product,
  delete_product,
  update_product,
} = require("../controllers/product_controllers");

router.post("/create", create_product);
router.get("/get-all", get_products);
router.get("/get-one/:id", get_product);
router.delete("/delete/:id", delete_product);
router.patch("/update/:id", update_product);

module.exports = router;
