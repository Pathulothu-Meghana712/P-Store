const express = require("express");

const Router = express.Router();

const { authMiddleWare } = require("./../middlewares/authMiddleware");

const {
  postCart,
  getEmptyCart,
  getMyCart,
  deleteCartProduct,
} = require("./../controllers/cartController");

Router.get("/postCart", authMiddleWare, postCart);

Router.get("/emptycart", getEmptyCart);

Router.get("/getMyCart", authMiddleWare, getMyCart);
Router.get("/deleteCartProduct", deleteCartProduct);

Router.get("/deleteCartProduct", deleteCartProduct);

module.exports = Router;
