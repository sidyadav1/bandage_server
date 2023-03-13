const db = require("../libraries/db");
const { v4: uuidv4 } = require("uuid");

const getUserCart = ({ userId }) => {
    return new Promise((resolve, reject) => {
        db.with(
            "user_cart",
            db.raw(`SELECT * FROM cart WHERE "userId"='${userId}'`)
        )
            .select([
                "user_cart.id AS id",
                "name",
                "images",
                "brand",
                "quantity",
                "price",
                "products.id AS productId",
            ])
            .from("user_cart")
            .innerJoin("products", function () {
                this.on("user_cart.productId", "=", "products.id");
            })
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const addProductToCart = ({ userId, productId, quantity }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .insert({ id: uuidv4(), userId, productId, quantity })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const updateProductQuantity = ({ id, quantity }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .update({ quantity })
            .where({ id })
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const removeCartItem = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .where({ id })
            .del()
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const emptyCart = ({ userId }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .where({ userId })
            .del()
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const getCartItemByProductId = ({ productId, userId }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .select("*")
            .where({ userId, productId })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getCartItemById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("cart")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

module.exports = {
    getUserCart,
    addProductToCart,
    updateProductQuantity,
    removeCartItem,
    emptyCart,
    getCartItemByProductId,
    getCartItemById,
};
