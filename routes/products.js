const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.post("/add_product", productController.addProduct);
router.get("/products/:id", productController.productById);
router.get("/products", productController.getProducts);

module.exports = router;
