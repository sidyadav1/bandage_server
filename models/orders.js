const { v4: uuidv4 } = require("uuid");
const db = require("../libraries/db");

const createNewOrder = ({ products, userId, amount }) => {
    return new Promise((resolve, reject) => {
        db("orders")
            .insert({
                id: uuidv4(),
                userId,
                products,
                amount,
                createdAt: Date.now(),
            })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getUserOrders = ({ userId }) => {
    return new Promise((resolve, reject) => {
        db("orders")
            .select("*")
            .where({ userId })
            .orderBy("createdAt", "desc")
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

module.exports = { createNewOrder, getUserOrders };
