const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");
const { 
    getsignIn,
    postsignIn, 
    getSignup, 
    postSignUp,
    getSignOut, 
    getForgotPassword, 
    postForgotPassword,
    getResetPassword, 
    postResetPassword,
} = require("./../controllers/authController");

// signup routes
Router.get("/signup", [], getSignup);
Router.post(
  "/signup",
  [ 
    body("fName").trim().notEmpty().withMessage("First Name cannot be empty"),

    body("lName").trim().notEmpty().withMessage("Last Name cannot be empty"),

    body("email").trim().isEmail().withMessage("Invalid email"),

    body("password").trim().notEmpty().withMessage("Password cannot be empty"),

    body("password")

        .trim()

        .isLength({ min: 8 }) 

        .withMessage("Password must be at least 8 characters long"),

    body("confirmPassword")

      .trim()

      .notEmpty()

      .withMessage("Password cannot be empty"),
  ],
  postSignUp
);

// signin routes
Router.get("/signin", [], getsignIn);
Router.post(
  "/signin",
  [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  postsignIn
);

// signout route
Router.get("/signout", getSignOut);

//forgot password
Router.get("/forgotPassword",[],getForgotPassword)
Router.post(
  "/forgotPassword",
  [
    body("email").trim().notEmpty().withMessage("email cannot be empty"),
    body("email").trim().isEmail().withMessage("Invalid email"),
  ],
postForgotPassword
);

//reset password
Router.get("/resetPassword/:token",[],getResetPassword)
Router.post(
  "/resetPassword/:token",
  [
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
      .custom((value, { req }) => {
        // Check if the password matches the confirmPassword field
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty"),
  ],
  postResetPassword
);


// Router.get("/signIn", getSignIn);
// Router.get("/signUp", getSignup);

// Router.post("/signIn", postSignIn);
// Router.post("/signUp", postSignup);



module.exports = Router;































