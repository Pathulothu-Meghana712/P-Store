// // ###########################    ADD TO CART    ##########################################################

const products = require("../models/product");

const cartModel = require("../models/cart");

// ###########################    ADD TO CART    ##########################################################

const postCart = async (req, res) => {
  // let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  const userId = req.session.user._id;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const product_id = req.query.p_id;

  const n = req.query.q;

  const newQuantity = Number(n);

  const existingUser = await cartModel.findOne({ user_id: userId });

  if (existingUser) {
    const cartObj = existingUser.cartProducts;

    const cartId = existingUser._id;

    for (let i = 0; i < cartObj.length; i++) {
      if (cartObj[i].product_id === product_id) {
        const totalQuantity = Number(cartObj[i].quantity) + newQuantity;

        await cartModel.updateOne(
          {
            _id: cartId,

            "cartProducts.product_id": product_id,
          },

          {
            $set: {
              "cartProducts.$.quantity": totalQuantity,
            },
          }
        );

        return res.redirect("/getMyCart");
      }
    }

    await cartModel.updateOne(
      { _id: cartId },

      {
        $push: {
          cartProducts: {
            product_id,

            quantity: newQuantity,
          },
        },
      }
    );

    return res.redirect("/getMyCart");
  } else {
    const cart = await products.findOne({ _id: product_id });

    let price = cart.price;

    // let total_price = price * newQuantity;

    const newOrder = new cartModel({
      user_id: userId,

      cartProducts: [
        {
          product_id,

          quantity: newQuantity,
        },
      ],
    });

    await newOrder.save();

    return res.redirect("/getMycart");
  }
};

// #########################    GET ORDERS    ##################################################

const getMyCart = async (req, res) => {
  let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const userId = req.session.user._id;

  // console.log("userId",userId);

  const cart = await cartModel.findOne({ user_id: userId });

  // console.log(cart);

  if (cart === null) {
    res.redirect("/emptycart");
  } else {
    // console.log("cart.cartProducts:",cart.cartProducts);

    let cartObj = cart.cartProducts;

    console.log("cartObj.cartProducts:", cartObj);

    if (cartObj.length === 0) {
      res.redirect("/emptycart");
    } else {
      const productIds = cartObj.map((product) => product.product_id);

      // const q = obj.map(quty => quty.quantity);

      // console.log("productIds",productIds);

      // console.log("quantity",q);

      const productsArray = [];

      for (const p of productIds) {
        const product = await products.findOne({ _id: p });

        if (product) {
          // product.quantity_in_cart = obj.quantity;

          // console.log("obj.quantity",obj.quantity);

          productsArray.push(product);
        }
      }

      // console.log(productsArray);

      const updatedProducts = [];

      cartObj.forEach((cartProduct) => {
        const foundProduct = productsArray.find(
          (product) => product._id.toString() === cartProduct.product_id
        );

        if (foundProduct) {
          // Ensure that the quantity is added correctly

          foundProduct.quantity = cartProduct.quantity;

          // console.log("foundProduct", foundProduct);

          updatedProducts.push(foundProduct);
        } else {
          console.log("not added quantity");
        }
      });

      res.render("./cart/cart", {
        selected: "Orders",

        isLoggedIn: req.session.isLoggedIn,

        isAdmin,

        productsArray,

        cartObj,
      });
    }
  }
};

// ################################################     EMPTY CART    #####################################

const getEmptyCart = async (req, res) => {
  let isAdmin;

  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./cart/emptyCart", {
    isLoggedIn: req.session.isLoggedIn,

    isAdmin,
  });
};

const deleteCartProduct = async (req, res) => {
  const product_id = req.query.p_id;

  const userId = req.session.user._id;

  const cart = await cartModel.findOne({ user_id: userId });

  console.log("Original Cart:", cart);

  // Filter the cart products based on the condition

  cart.cartProducts = cart.cartProducts.filter(
    (item) => item.product_id !== product_id
  );

  // Save the updated cart object

  await cart.save();

  console.log("Updated Cart:", cart);

  // Send a response or redirect as needed

  res.redirect("/getMyCart");
};

module.exports = { postCart, getMyCart, getEmptyCart, deleteCartProduct };
