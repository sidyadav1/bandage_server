const {
    validateEmail,
    validateName,
    validatePhone,
    validatePassword,
} = require("../helpers/validation");

const newUserValidation = (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!validateName(name)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid name.",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid phone number.",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide a stronger password with lowercase, uppercase, numeric and special characters.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some unexpected error occured.",
        });
    }
};

const loginDataValidation = (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide a password.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some unexpected error occured.",
        });
    }
};

module.exports = { newUserValidation, loginDataValidation };
