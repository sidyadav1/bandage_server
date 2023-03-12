const {
    createNewProduct,
    getAllProducts,
    getProductById,
} = require("../models/products");
const { validate } = require("uuid");

const addProduct = async (req, res) => {
    try {
        const { name, category, price, description, images, brand } = req.body;
        const newProduct = await createNewProduct({
            name,
            category,
            price,
            description,
            images,
            brand,
        });
        return res.status(200).json({
            success: true,
            message: "New Product added",
            data: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const productById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !validate(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id",
            });
        }

        const product = await getProductById({ id });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { addProduct, getProducts, productById };
