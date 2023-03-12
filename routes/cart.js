const express = require("express");
const authenticator = require("../middlewares/authenticator");
const cartController = require("../controllers/cart");
const router = express.Router();

router.get(
    "/user_cart",
    authenticator.jwtAuthenticator,
    cartController.userCart
);
router.post(
    "/add_to_cart",
    authenticator.jwtAuthenticator,
    cartController.addTocart
);
router.put(
    "/update_quantity",
    authenticator.jwtAuthenticator,
    cartController.updateQuantity
);

router.delete(
    "/remove_item",
    authenticator.jwtAuthenticator,
    cartController.removeProduct
);

module.exports = router;
