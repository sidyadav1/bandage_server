const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.post("/add_product", productController.addProduct);
router.get("/products/:id", productController.productById);
router.get("/products", productController.getProducts);

module.exports = router;

// {
//     "name": "Men Black & Olive Green Slim Fit Checked Casual Shirt",
//     "category": "men",
//     "price": 493,
//     "description": "Black and olive green checked casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
//     "images": ["https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8469255/2022/8/6/8c8ae38f-19e2-4ed2-8650-f81864a5d27f1659770152859HIGHLANDERMenBlackOliveGreenSlimFitCheckedCasualShirt1.jpg", "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8469255/2022/8/6/9464c96f-407f-46b6-8f2f-af7b05ce949f1659770152883HIGHLANDERMenBlackOliveGreenSlimFitCheckedCasualShirt2.jpg", "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8469255/2022/8/6/6d97d434-b732-4c96-9d66-0026fa3a4de61659770152906HIGHLANDERMenBlackOliveGreenSlimFitCheckedCasualShirt3.jpg", "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8469255/2022/8/6/28c6e575-4158-4cb4-a71c-c91df5945ddc1659770152956HIGHLANDERMenBlackOliveGreenSlimFitCheckedCasualShirt5.jpg", "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8469255/2022/8/6/e4c26746-a4d3-4b84-94b7-48d374f5a8741659770152982HIGHLANDERMenBlackOliveGreenSlimFitCheckedCasualShirt6.jpg"],
//     "brand": "Highlander"
// }
