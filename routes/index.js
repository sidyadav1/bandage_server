const express = require("express");
const app = express();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const productRoutes = require("./products");
const cartRoutes = require("./cart");
const orderRoutes = require("./orders");

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);

module.exports = app;
