const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
