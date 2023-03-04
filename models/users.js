const db = require("../libraries/db");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const createNewUser = ({ name, email, phone, password }) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
        db("users")
            .insert({
                id: uuidv4(),
                name,
                email,
                phone,
                password: hashedPassword,
            })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getUserByEmail = ({ email }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .where({ email })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getUserById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

module.exports = { createNewUser, getUserByEmail, getUserById };
