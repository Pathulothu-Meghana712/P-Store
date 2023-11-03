// const { Admin } = require("mongodb");
const { validationResult } = require("express-validator");
const products = require("../models/product");
const cartModel = require("./../models/cart");
const userModel = require("./../models/userModel");

const getHomePage = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  res.render("./home", {
    selected: "home",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
  });
};

const getPhoneStore = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  // // console.log(isAdmin);
  // // console.log(req.session.user.admin);
  const kids = await products.find({ category: "phone" });
  res.render("./shopping/kidsWorld", {
    selected: "phone",
    isLoggedIn: req.session.isLoggedIn,
    kids,
    isAdmin,
  });
};

const getLaptopStore = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  const kids = await products.find({ category: "laptop" });
  // // console.log(laptop);
  res.render("./shopping/kidsWorld", {
    selected: "laptop",
    isLoggedIn: req.session.isLoggedIn,
    kids,
    isLoggedIn,
    isAdmin,
  });
};

const getTvStore = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  const kids = await products.find({ category: "tv" });
  res.render("./shopping/kidsWorld", {
    selected: "tv",
    isLoggedIn: req.session.isLoggedIn,
    kids,
    isLoggedIn,
    isAdmin,
  });
};

const getClothingStore = async (req, res) => {
  // // console.log("CLOTHING SESSION", req.session);
  res.render("./shopping/clothingStore", {
    selected: "clothing",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getContacts = async (req, res) => {
  res.render("./shopping/contactUs", {
    selected: "contactUs",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getFaq = async (req, res) => {
  res.render("./help/faq", {
    selected: "faq",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getPrivacyPolicy = async (req, res) => {
  res.render("./help/privacyPolicy", {
    selected: "privacyPolicy",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getTerms = async (req, res) => {
  res.render("./help/terms", {
    selected: "terms",
    isLoggedIn: req.session.isLoggedIn,
  });
};

const getkidsWorld = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  const kids = await products.find({ category: "kids" });
  // console.log(kids);
  res.render("./shopping/kidsWorld", {
    selected: "kidsWorld",
    isLoggedIn: req.session.isLoggedIn,
    kids,
    isAdmin,
  });
};

const getmensWorld = async (req, res) => {
  const kids = await products.find({ category: "men" });
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  res.render("./shopping/kidsWorld", {
    selected: "mensWorld",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
    kids,
  });
};

const getwomenWorld = async (req, res) => {
  const kids = await products.find({ category: "women" });
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  res.render("./shopping/kidsWorld", {
    selected: "womenWorld",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
    kids,
  });
};

// #################3   cosmetics controllers    ################

const getskincare = async (req, res) => {
  const kids = await products.find({ category: "skincare" });

  let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./shopping/kidsWorld", {
    selected: "skincare",

    isLoggedIn: req.session.isLoggedIn,

    isAdmin,

    kids,
  });
};

const getperfume = async (req, res) => {
  const kids = await products.find({ category: "perfume" });

  let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./shopping/kidsWorld", {
    selected: "perfume",

    isLoggedIn: req.session.isLoggedIn,

    isAdmin,

    kids,
  });
};

const getmakeup = async (req, res) => {
  const kids = await products.find({ category: "makeup" });

  let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./shopping/kidsWorld", {
    selected: "makeup",

    isLoggedIn: req.session.isLoggedIn,

    isAdmin,
    kids,
  });
};

const gethair = async (req, res) => {
  const kids = await products.find({ category: "hair" });
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  res.render("./shopping/kidsWorld", {
    selected: "hair",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
    kids,
  });
};

// ##########################   ADMIN CONTROLLERS    ############################################

const getaddProduct = async (req, res) => {
  let isAdmin;
  let errorObj = {};
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  if (Object.keys(errorObj).length) {
    return res.render("./admin/addProduct", {
      errorObj,
      selected: "addProduct",
      oldData: {
        product_name,
        price,
        description,
        img_url,
        category,
      },
      isLoggedIn: req.session.isLoggedIn,
    });
  }
  res.render("./admin/addProduct", {
    selected: "addProduct",
    errorObj: {},
    oldData: {},
    isLoggedIn: req.session.isLoggedIn,
    isAdmin,
  });
};

const submit_product = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const { product_name, price, description, img_url, category } = req.body;

  const { errors } = validationResult(req);

  console.log("errors", errors);

  let errorObj = {};

  if (errors.length) {
    errorObj = errors.reduce((acc, cur) => {
      acc[cur.path] = cur.msg;

      return acc;
    }, {});
  } else {
    if (!product_name) {
      errorObj.errorBlockMessage = "Product Name should not be empty.";
    }
  }

  if (Object.keys(errorObj).length) {
    return res.render("./admin/addProduct", {
      errorObj,
      isAdmin,

      isLoggedIn: req.session.isLoggedIn,
    });
  } else {
    const newProduct = new products({
      product_name,
      price,
      description,
      img_url,
      category,
    });

    await newProduct.save();

    res.render("home", {
      isAdmin,

      isLoggedIn: req.session.isLoggedIn,

      errorObj,
    });
  }

  // // console.log(req.body);

  // // console.log(product_name, price, description, img_url, category);
};

// #######################  VIEW & EDIT PRODUCT ###############################################################

const getviewProduct = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  const p_id = req.query.p_id;
  const product = await products.find({ _id: p_id });
  const session = req.session;
  if (isLoggedIn) {
    userId = req.session.user._id;

    const existingUser = await cartModel.findOne({ user_id: userId });

    if (existingUser) {
      const cartObj = existingUser.cartProducts;
      const cartId = existingUser._id;

      // console.log("cartObj",cartObj);

      for (let i = 0; i < cartObj.length; i++) {
        if (cartObj[i].product_id === p_id) {
          const totalQuantity = Number(cartObj[i].quantity);
          // console.log("totalQuantity",totalQuantity)
        }
      }
    }
    res.render("viewProduct", {
      selected: "viewProduct",
      isLoggedIn: req.session.isLoggedIn,
      product,
      session,
      isAdmin,
    });
  } else {
    res.render("viewProduct", {
      selected: "viewProduct",
      isLoggedIn: req.session.isLoggedIn,
      product,
      session,
      isAdmin,
    });
  }
};

// #############    UPDATE PRODUCT    #####################################

const geteditProduct = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const p_id = req.query.p_id;
  const product = await products.find({ _id: p_id });

  res.render("./admin/editProduct", {
    selected: "editProduct",
    isLoggedIn: req.session.isLoggedIn,
    product,
    isAdmin,
  });
};

const post_update_Product = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  // const p_category = req.query.p_category;
  const {
    productId,
    product_name,
    price,
    description,
    img_url,
    category,
  } = req.body;
 
  const updatedProductData = {
    product_name: product_name,
    price: price,
    description: description,
    img_url: img_url,
    category: category,
  };
  // // console.log(productId, productName, product_price, product_description, imgUrl);
  // // console.log(updatedProductData);
  products
    .findByIdAndUpdate(productId, updatedProductData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        // Handle the case where the product with the given ID was not found
        // console.error('Product not found');
      } else {
        // // console.log('Updated product:', updatedProduct);
        res.render("home", {
          isLoggedIn: req.session.isLoggedIn,
          isAdmin,
        });
      }
    })
    .catch((err) => {
      // Handle errors
      // console.error('Error updating product:', err);
    });
};

// ##############   DELETE PRODUCT ###############################################

const postDeleteProduct = async (req, res) => {
  const p_id = req.query.p_id;
  // const product_id = await products.find({_id:p_id});
  try {
    // Find the product by _id and remove it
    const deletedProduct = await products.findByIdAndRemove(p_id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // res.status(200).json({ message: 'Product deleted successfully' });
    res.redirect("/", "/", {
      isLoggedIn: req.session.isLoggedIn,
      isAdmin: req.session.user.admin,
    });
  } catch (error) {
    // console.error('Error deleting product:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ##############     getSearch     ########################

const getSearch = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }
  // const { product_name, price, description, img_url, category } = req.body;
  // // console.log("req.body",req.query.query);
  const query = req.query.query.toLowerCase();
  // const words = query.split(" ");
  // // console.log("words",words);
  // const regexPattern = `(${words.join('|')})`;
  // // console.log("regexPattern",regexPattern)
  const regex = new RegExp(query, "i");

  // const [name_wise, category_wise, description_wise] = await Promise.all([
  // products.find({ product_name: { $regex: regex } }).exec(),
  //   products.find({ category: { $regex: regex } }).exec(),
  //   products.find({ description : { $regex: regex } }).exec(),
  // ]);
  // const kidsSet = new Set();
  // const search = new Set();
  // const combined_wise = [...name_wise, ...category_wise,...description_wise];
  // combined_wise.forEach((item) => {
  //   if (!search.has(item._id)) {
  //     search.add(item._id);
  //     kidsSet.add(item);
  //   }
  // });
  // const kids = Array.from(kidsSet);
  // // // console.log("search",search)
  // // console.log("kids",kids)
  const kids = await products.find({ product_name: { $regex: regex } }).exec();
  // // console.log("kids",kids);

  if (kids.length === 0) {
    const kids = await products.find();
    res.render("./shopping/kidsWorld", {
      kids,
      isLoggedIn,
      isAdmin,
    });
  } else {
    res.render("./shopping/kidsWorld", {
      selected: "kidsWorld",
      isLoggedIn: req.session.isLoggedIn,
      kids,
      isAdmin,
    });
  }
};

// ############################   VIEW PROFILE    ###################################################

const getViewProfile = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const user_id = req.session.user._id;
  const userDetails = await userModel.findOne({ _id: user_id });
  console.log(userDetails);

  res.render("./profile", {
    userDetails,
    isLoggedIn,
    isAdmin,
  });
};
//#################################### Admin Page Mange Users ##################################################//

const getManageUsers = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  if (isAdmin) {
    const userDetails = await userModel.find();
    //console.log(userDetails);
    res.render("./admin/adminPage", {
      isAdmin,
      isLoggedIn,
      userDetails,
    });
  } else {
    const user_id = req.session.user._id;
    const userDetails = await userModel.findOne({ _id: user_id });
    // console.log(userDetails);

    res.render("/views/profile", {
      userDetails,
      isLoggedIn,
      isAdmin,
    });
  }
};

// ############################   ABOUT US    ###################################################

const getAboutUs = async (req, res) => {
  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./shopping/aboutUs", {
    isLoggedIn,
    isAdmin,
  });
};

module.exports = {
  getHomePage,
  getClothingStore,
  getContacts,
  getLaptopStore,
  getPhoneStore,
  getTvStore,
  getkidsWorld,
  getmensWorld,
  getwomenWorld,
  gethair,
  getperfume,
  getmakeup,
  getskincare,
  getviewProduct,
  postDeleteProduct,

  // ########## ADMIN CONTROLLERS

  getaddProduct,
  submit_product,
  geteditProduct,
  post_update_Product,
  // getCart,
  // getOrders,

  // #############    VIEW PROFILE    #######################
  getViewProfile,
  getManageUsers,
  getAboutUs,
  getSearch,
  getFaq,
  getPrivacyPolicy,
  getTerms,
};
