const express = require("express");
const authController = require("../controllers/auth");
const authValidator = require("../middlewares/validator");

const router = express.Router();

router.post(
    "/registration",
    authValidator.newUserValidation,
    authController.registration
);
router.post("/login", authValidator.loginDataValidation, authController.login);

module.exports = router;
