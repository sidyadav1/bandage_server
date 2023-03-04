const express = require("express");
const app = express();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const productRoutes = require("./products");

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);

module.exports = app;
