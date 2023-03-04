const express = require("express");
const authenticator = require("../middlewares/authenticator");
const userController = require("../controllers/users");
const router = express.Router();

router.get("/me", authenticator.jwtAuthenticator, userController.me);

module.exports = router;
