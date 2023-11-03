const express = require("express");
const Router = express.Router();
// const { authMiddleWare } = require("./../middlewares/authMiddleware");
const { postOrders, getOrders, getEmptyOrder } = require("./../controllers/ordersController");

Router.get("/postOrder", postOrders);
Router.get("/getOrders", getOrders);
Router.get("/emptyOrders", getEmptyOrder)


module.exports = Router;
 