const {
    getUserCart,
    addProductToCart,
    updateProductQuantity,
    removeCartItem,
    getCartItemByProductId,
    getCartItemById,
} = require("../models/cart");
const { validate } = require("uuid");

const userCart = async (req, res) => {
    try {
        const { id: userId } = req.session;
        const cart = await getUserCart({ userId });
        return res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const addTocart = async (req, res) => {
    try {
        const { id: userId } = req.session;
        const { productId, quantity } = req.body;
        if (
            !productId ||
            !quantity ||
            !validate(productId) ||
            isNaN(quantity)
        ) {
            return res.status(400).json({
                success: false,
                message: "Product id or quantity invalid",
            });
        }
        const existingCartItem = await getCartItemByProductId({
            userId,
            productId,
        });

        if (existingCartItem) {
            return res.status(409).json({
                success: false,
                message: "Product already in cart",
            });
        }

        const cartItem = await addProductToCart({
            userId,
            productId,
            quantity,
        });
        return res.status(200).json({
            success: true,
            data: cartItem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { id, quantity } = req.body;

        if (!validate(id) || isNaN(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Product id or quantity invalid",
            });
        }
        const existingCartItem = await getCartItemById({ id });

        if (!existingCartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart",
            });
        }

        await updateProductQuantity({ id, quantity });
        return res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await removeCartItem({ id });
        return res.status(200).json({
            success: true,
            message: "Cart item removed",
        });
    } catch (error) {}
};

module.exports = { userCart, addTocart, updateQuantity, removeProduct };
