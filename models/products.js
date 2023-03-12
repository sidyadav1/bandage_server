const { v4: uuidv4 } = require("uuid");
const db = require("../libraries/db");

const createNewProduct = ({
    name,
    category,
    price,
    description,
    images,
    brand,
}) => {
    return new Promise((resolve, reject) => {
        db("products")
            .insert({
                id: uuidv4(),
                name,
                category,
                price,
                description,
                images,
                brand,
            })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db("products")
            .select("*")
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const getProductById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("products")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const getProductsById = ({ ids }) => {
    return new Promise((resolve, reject) => {
        db("products")
            .select("*")
            .whereIn("id", ids)
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getProductById,
    getProductsById,
};
