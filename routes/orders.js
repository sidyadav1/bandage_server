const express = require("express");
const ordersController = require("../controllers/orders");
const authenticator = require("../middlewares/authenticator");

const router = express.Router();

router.post(
    "/new_order",
    authenticator.jwtAuthenticator,
    ordersController.newOrder
);

router.get(
    "/orders",
    authenticator.jwtAuthenticator,
    ordersController.getOrders
);

module.exports = router;
