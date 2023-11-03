const { body } = require("express-validator");
const { authMiddleWare } = require("./../middlewares/authMiddleware");

 
const express = require("express");

// const multer = require("multer");

const Router = express.Router();

const app = express();

const {

    getSell,

    submitAd,

    getavailable,
    getMyAds,
    postDeleteProduct,
    geteditProduct,
    post_update_Product,
  
  } = require("./../controllers/sellController");

 

  Router.get("/sellProduct",authMiddleWare, getSell);

  Router.post(
    "/submitAd", 
    [
      body("title").trim().notEmpty().withMessage("Product Name cannot be empty"),
    
      body("price").trim().notEmpty().withMessage("Price cannot be empty"),
  
      body("description").trim().notEmpty().withMessage("description cannot be empty"),
  
      body("img_url").trim().notEmpty().withMessage("img_url cannot be empty"),
  
      body("area").trim().notEmpty().withMessage("area cannot be empty"),

      body("contact").trim().isNumeric().withMessage("invalid contact"),

  
  ],
  submitAd
  );

  Router.get("/availableProduct", getavailable);

  Router.get("/myAds", getMyAds);
  Router.get("/deletemyAdsProduct", postDeleteProduct);
  Router.get("/sell/updateProduct", geteditProduct);
  Router.post("/updateSellProduct", post_update_Product);




module.exports = Router;