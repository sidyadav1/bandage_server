const jwt = require("jsonwebtoken");

const generateJWTToken = ({ payload }) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
            if (error) {
                return reject(error);
            }
            return resolve(token);
        });
    });
};

const verifyJWTToken = ({ token }) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        });
    });
};

module.exports = { generateJWTToken, verifyJWTToken };
