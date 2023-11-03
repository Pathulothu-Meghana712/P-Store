
const express = require("express");

const Router = express.Router();
const { body } = require("express-validator");

const app = express();

const {


  getHomePage,
  // getClothingStore,
  getContacts,

  getLaptopStore,

  getPhoneStore,

  getTvStore,

  getkidsWorld,

  getmensWorld,

  getwomenWorld,
  getaddProduct,

  submit_product,

  getviewProduct,

  geteditProduct,

  post_update_Product,

  postDeleteProduct,

  getViewProfile,
  getManageUsers,
  

  getFaq,
  getTerms,
  getClothingStore,
  // #################3   cosmetics routes    ################
  getskincare,
  getperfume,
  getmakeup,
  gethair,
  getAboutUs,
  // ##############     getSearch     ########################
  getSearch,
  getPrivacyPolicy,
} = require("./../controllers/shoppingController");

 

 
 

Router.get("/", getHomePage);

Router.get("/contactUs", getContacts);

Router.get("/laptop", getLaptopStore);

Router.get("/phone", getPhoneStore);

Router.get("/tv", getTvStore);
// 
Router.get("/clothing", getClothingStore);

Router.get("/kidsWorld", getkidsWorld);

Router.get("/mensWorld", getmensWorld);

Router.get("/womenWorld", getwomenWorld);
Router.get("/aboutUs", getAboutUs);
Router.get("/faq",getFaq);
Router.get("/privacyPolicy",getPrivacyPolicy);
Router.get("/terms",getTerms);

  // #################3   cosmetics routes    ################
  Router.get("/skincare", getskincare);
  Router.get("/perfume",getperfume);
  Router.get("/makeup",getmakeup);
  Router.get("/hair",gethair);

// ##########################   ADMIN ROUTES    ############################################

 

Router.get("/addProduct", getaddProduct);


Router.post(
  "/submit_product", 
  [
    body("product_name").trim().notEmpty().withMessage("Product Name cannot be empty"),
    
    body("price").trim().notEmpty().withMessage("Price cannot be empty"),

    body("description").trim().notEmpty().withMessage("description cannot be empty"),

    body("img_url").trim().notEmpty().withMessage("img_url cannot be empty"),

    body("category").trim().notEmpty().withMessage("category cannot be empty"),

],
submit_product
);
Router.get("/admin/editProduct", geteditProduct);
Router.post("/updateProduct", post_update_Product);
Router.get("/deleteProduct", postDeleteProduct);


 

 

// #######################  VIEW PRODUCT ###############################################################

Router.get("/viewProduct", getviewProduct)


 

// ##################################     VIEW PROFILE    #############################################

Router.get("/viewProfile", getViewProfile)
Router.get("/getManageUsers",getManageUsers)


// ###################################      SEARCH BAR    ##############################################
Router.get("/search",getSearch)



module.exports = Router;