const products = require("../models/product");

const cartModel = require("../models/cart");

const ordersModel = require("../models/ordersModel");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const productsBackUpModel = require("./../models/productsBackUp");

const postOrders = async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  const userId = req.session.user._id;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const User = await cartModel.findOne({ user_id: userId });

  console.log(User);

  if (User) {
    const cartObj = User.cartProducts;

    const cartId = User._id;

    console.log("cartObj", cartObj);

    const newOrder = new ordersModel({
      user_id: userId,

      cartProducts: cartObj,
    });

    // console.log("newOrder",newOrder);

    await newOrder.save();

    await cartModel.findByIdAndRemove(cartId);

    const existingOrder = await ordersModel.find({ user_id: userId });

    // const foundProducts = [];

    // // Iterate through each object in existingOrder
    // for (let i = 0; i < existingOrder.length; i++) {
    //   const orderItem = existingOrder[i];
    //   const productIds = orderItem.cartProducts.map((item) => item.product_id);

    //   // Use Mongoose to find the products based on productIds
    //   products
    //     .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } })
    //     .then((products) => {
    //       // console.log("products", products);
    //       // Add the found products to the foundProducts array
    //       foundProducts.push({ orderItem, products });
    //     })

    //       // Check if we have found all products (at the end of the loop)
    //       // if (foundProducts.length === existingOrder.length) {
    //       //   // At this point, foundProducts contains the found products for each order item
    //       //   // console.log('Found products:', foundProducts);

    //       //   const mergedData = foundProducts.map((orderItem) => {
    //       //     const cartProducts = orderItem.orderItem.cartProducts.map((cartProduct) => {
    //       //       const product = products.find((p) => p._id.toString() === cartProduct.product_id);
    //       //       return { ...cartProduct, ...product };
    //       //     });

    //       //     return { ...orderItem, orderItem: { ...orderItem.orderItem, cartProducts } };
    //       //   });
    // }
    // }

    res.redirect("/getOrders");
  } else {
    res.redirect("/emptyOrders");
  }
};

const getOrders = async (req, res) => {
  const userId = req.session.user._id;

  let isAdmin;
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  const existingOrder = await ordersModel.find({ user_id: userId });

  console.log("existingOrder", existingOrder);

  if (existingOrder.length === 0) {
    res.redirect("/emptyOrders");
  } else {
    // console.log("existingUser", existingOrder);

    const foundProducts = [];

    // Iterate through each object in existingOrder

    for (let i = 0; i < existingOrder.length; i++) {
      const orderItem = existingOrder[i];

      const productIds = orderItem.cartProducts.map((item) => item.product_id);

      // Use Mongoose to find the products based on productIds

      products

        .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } })

        .then((products) => {
          // console.log("products", products);

          // Add the found products to the foundProducts array

          foundProducts.push({ orderItem, products });

          // Check if we have found all products (at the end of the loop)

          if (foundProducts.length === existingOrder.length) {
            // At this point, foundProducts contains the found products for each order item

            // console.log('Found products:', foundProducts);

            const mergedData = foundProducts.map((orderItem) => {
              const cartProducts = orderItem.orderItem.cartProducts.map(
                (cartProduct) => {
                  const product = products.find(
                    (p) => p._id.toString() === cartProduct.product_id
                  );

                  return { ...cartProduct, ...product };
                }
              );

              return {
                ...orderItem,
                orderItem: { ...orderItem.orderItem, cartProducts },
              };
            });

            // console.log("mergedData",mergedData)
            foundProducts.reverse();
            // Move the rendering code inside this block

            res.render("./orders/orders", {
              selected: "orders",
              isAdmin,

              isLoggedIn: req.session.isLoggedIn,

              foundProducts: foundProducts,

              existingOrder: existingOrder, // Pass existingOrder here

              session: req.session,

              mergedData: mergedData, // Pass mergedData here
            });
          }
        })

        .catch((error) => {
          console.error("Error finding products:", error);

          // res.redirect("/emptyOrders")
        });
    }
  }
};

const getEmptyOrder = async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  const userId = req.session.user._id;

  if (isLoggedIn) {
    isAdmin = req.session.user.admin;
  } else {
    isAdmin = false;
  }

  res.render("./orders/emptyOrders", {
    isLoggedIn,

    isAdmin,
  });
};

module.exports = { postOrders, getOrders, getEmptyOrder };
