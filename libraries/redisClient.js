const redis = require("redis");

const client = redis.createClient();
client
    .connect()
    .then(() => {
        console.log("Redis server started");
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = client;
