const { generateJWTToken } = require("../helpers/jwt");
const { getUserByEmail, createNewUser } = require("../models/users");
const crypto = require("crypto");

const registration = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await getUserByEmail({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email address already registered.",
            });
        }

        const newUser = await createNewUser({ name, email, phone, password });
        const token = await generateJWTToken({ payload: { id: newUser.id } });

        return res.status(200).json({
            success: true,
            message: "User account created.",
            data: { user: newUser, token: token },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some unexpected error occured.",
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail({ email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Email address not found." });
        }

        const dbPassword = user.password;
        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (dbPassword !== passwordHash) {
            return res
                .status(401)
                .json({ success: false, message: "Incorrect password!!!" });
        }

        const token = await generateJWTToken({ payload: { id: user.id } });
        return res.status(200).json({
            success: true,
            message: "User login successful.",
            data: { user, token },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some unexpected error occured.",
        });
    }
};

module.exports = { registration, login };
