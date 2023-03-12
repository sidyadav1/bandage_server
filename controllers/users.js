const { getUserById } = require("../models/users");

const me = async (req, res) => {
    try {
        const { id } = req.session;
        const user = await getUserById({ id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found / Invalid token.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched.",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { me };
