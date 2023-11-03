const Sell = require("../models/sellModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");



const getSell = async(req, res) => {

  let errorObj = {};


  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn){
    isAdmin = req.session.user.admin;
  }else{
    isAdmin = false;
  }
  res.render("sell/sellProduct", {
    selected: "sellProduct",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
    errorObj,
  });
};

 

const submitAd = async (req, res) => {

  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn){
    isAdmin = req.session.user.admin;
  }else{
    isAdmin = false;
  }

  const user_id = req.session.user._id;
  // // console.log("req.body",req.body);
  const { title, description, price, contact, img_url, area} = req.body;

    // console.log("req.body",req.body);
  const { errors } = validationResult(req);

  console.log("errors",errors)

  let errorObj = {};

  if (errors.length) {

    errorObj = errors.reduce((acc, cur) => {

      acc[cur.path] = cur.msg;

      return acc;

    }, {});

  } else {

    if (!(title)) {

      errorObj.errorBlockMessage = "Product Name should not be empty.";

    }

  }

    if (Object.keys(errorObj).length) {
      return res.render("./sell/sellProduct", {
        errorObj,
        isLoggedIn: req.session.isLoggedIn,
    }

  )}
  else{
    const newAd = new Sell({ 
      title,
      description,
      price,
      contact,
      img : img_url,
      user_id,
      area });

    await newAd.save();
    res.render("home", {
      isAdmin,
      isLoggedIn,
      // // console.log(newAd._id),
      adId: newAd._id, // Optionally, you can pass the ID of the newly created ad
    });
};
}

 

 

const getavailable = async(req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn){
    isAdmin = req.session.user.admin;
  }else{
    isAdmin = false;
  }
  const availableProduct = await Sell.find({});
  // console.log("availableProduct",availableProduct);
  res.render("./sell/availableProduct", {
    selected: "availableProduct",
    isLoggedIn: req.session.isLoggedIn,
    availableProduct,
    isAdmin,
  });

};


const getMyAds = async (req, res) => {

  try {

    const isLoggedIn = req.session.isLoggedIn;

 

    if (isLoggedIn) {

      const userId = req.session.user._id;

      const isAdmin = req.session.user.admin;

 

      let myAds;

 

      myAds = await Sell.find({ user_id: userId });

 

      if (myAds.length){

        res.render("./sell/myAds", {

          selected: "myAds",

          isLoggedIn,

          isAdmin,

          myAds,

          userId,

        });  

      }else{

        res.render("./sell/emptyAds",{

          isLoggedIn,

          isAdmin,

        })

      }

 

      // console.log("myAds",myAds)

 

 

      // if (isAdmin) {

      //   myAds = await Sell.find({});

      // } else {

      //   myAds = await Sell.find({ user_id: userId });

      // }

 

    } else {

      res.redirect("/login");

    }

  } catch (error) {

    console.error("Error fetching user's ads:", error);

    res.status(500).render("errorPage", { error });

  }

};

 

/* ########################################### Edit Option ############################################# */

const geteditProduct = async(req, res) => {

  const p_id = req.query.p_id;
  const product = await Sell.find({_id:p_id});

  res.render("./sell/updateProduct" , {
    selected:"updateProduct",
    isLoggedIn: req.session.isLoggedIn,
    product,
  })
}

const post_update_Product = async(req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn){
    isAdmin = req.session.user.admin;
  }else{
    isAdmin = false;
  }

  // const p_category = req.query.p_category;
  // console.log("req.body", req.body);
  const productId = req.body.productId;
  const { title, description, price, contact, img_url, area} = req.body;
  const updatedProductData = {
    title : title,
    price : price,
    description : description,
    contact : contact,
    img : img_url,
    category : area,
  };
  // // console.log(productId, productName, product_price, product_description, imgUrl);
  // // console.log(updatedProductData);
  Sell.findByIdAndUpdate(productId, updatedProductData, { new: true })
  .then(updatedProduct => {
      if (!updatedProduct) {
          // Handle the case where the product with the given ID was not found
          // console.error('Product not found');
      } else {
        // // console.log('Updated product:', updatedProduct);
        res.render("home",{
          isLoggedIn: req.session.isLoggedIn,
          isAdmin,
        })
      }
  })
  .catch(err => {
      // Handle errors
      // console.error('Error updating product:', err);
  });
}

/* ######################################### Delete Option ############################################# */


const postDeleteProduct = async(req, res) => {
  const p_id = req.query.p_id;
  // const product_id = await products.find({_id:p_id});
  try {
    // Find the product by _id and remove it
    const deletedProduct = await Sell.findByIdAndRemove(p_id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // res.status(200).json({ message: 'Product deleted successfully' });
    res.redirect("/", "/", {
      isLoggedIn: req.session.isLoggedIn,
      isAdmin: req.session.user.admin,
    });
      } catch (error) {
    // console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


 

module.exports = { getSell, submitAd, getavailable, getMyAds,postDeleteProduct, geteditProduct, post_update_Product, };
