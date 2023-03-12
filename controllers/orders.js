const { emptyCart } = require("../models/cart");
const { createNewOrder, getUserOrders } = require("../models/orders");
const { getProductsById } = require("../models/products");

const newOrder = async (req, res) => {
    try {
        const { id: userId } = req.session;
        const { products, amount } = req.body;

        if (!products || !Array.isArray(products) || !amount) {
            return res.status(400).json({
                success: false,
                message: "Products or amount invalid",
            });
        }

        const order = await createNewOrder({ products, userId, amount });
        await emptyCart({ userId });
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const { id: userId } = req.session;

        const orders = await getUserOrders({ userId });
        const productIds = [];
        orders.forEach((order) => {
            order.products.forEach((product) => productIds.push(product.id));
        });

        const productsArray = await getProductsById({ ids: productIds });
        const products = productsArray.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});

        return res
            .status(200)
            .json({ success: true, data: { orders, products } });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { newOrder, getOrders };
