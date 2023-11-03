const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const authMiddleWare = require("./../middlewares/authMiddleware")
// const transporter=require("./../middlewares/nodeMailerConfig")
// const generateResetToken=require("./../middlewares/tokenGenerator")

const getSignup = async (req, res) => {
  res.render("./auth/signup", {
    selected: "signin",
    errorObj: {},
    oldData: {},
    isLoggedIn: req.session.isLoggedIn,
  });
};

const postSignUp = async (req, res) => {
  const { fName, lName, email, password, confirmPassword } = req.body;
  const { errors } = validationResult(req);
  let errorObj = {};
  if (errors.length) {
    errorObj = errors.reduce((acc, cur) => {
      acc[cur.path] = cur.msg;
      return acc;
    }, {});
  } else {
    if (password !== confirmPassword) {
      errorObj.errorBlockMessage = "Passwords don't match! Try again.";
    }
  }
  // Checking if any user is present with same email.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    errorObj.errorBlockMessage = "User with the email already exists!";
  }

  if (Object.keys(errorObj).length) {
    return res.render("./auth/signup", {
      errorObj,
      selected: "signin",
      oldData: {
        fName,
        lName,
        email,
        password,
        confirmPassword,
      },
      isLoggedIn: req.session.isLoggedIn,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    fName,
    lName,
    email,
    password: hashedPassword,
    admin: false,
  });
  await newUser.save();
  res.redirect("/signin");
};

const getsignIn = async (req, res) => {
  res.render("./auth/signin", {
    selected: "signin",
    errorObj: {},
    oldData: {},
    isLoggedIn: req.session.isLoggedIn,
  });
};

const postsignIn = async (req, res) => {
  const { email, password } = req.body;
  const { errors } = validationResult(req);
  let existingUser;
  let isAdmin;
  let errorObj = {};
  if (errors.length) {
    errorObj = errors.reduce((acc, cur) => {
      acc[cur.path] = cur.msg;
      return acc;
    }, {});
  } else {
    existingUser = await User.findOne({ email });
    req.session.user = existingUser;
    if (existingUser) {
      const hashedPassword = existingUser.password;
      isAdmin = existingUser.admin;
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      if (isAdmin) {
        // console.log("the user is admin",isAdmin);
      } else {
        // console.log("the user is not admin");
      }
      if (!isPasswordValid) {
        errorObj.errorBlockMessage =
          "Invalid username or password! Please try again.";
      }
    } else {
      errorObj.errorBlockMessage =
        "Invalid username or password! Please try again.";
    }
  }
  if (Object.keys(errorObj).length) {
    return res.render("./auth/signin", {
      errorObj,
      selected: "signin",
      oldData: {
        email,
        password,
      },
      isLoggedIn: req.session.isLoggedIn,
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = existingUser;
  req.session.save(() => {
    res.render("home", {
      isAdmin,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

const getSignOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/signIn");
  });
};

const getResetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("token from get reset method:", token);
    const user = await User.findOne({
      resetPasswordToken: token,
    });
    const successMessage = "A password reset link has been sent to your email.";

    if (!user) {
      return res.render("./auth/forgotPassword", {
        selected: "forgotPassword",
        errorObj: {},
        oldData: {},
        isLoggedIn: req.session.isLoggedIn,
      });
    }

    console.log("user found with the token  from get method:", user);

    res.render("./auth/resetPassword", {
      selected: "resetPassword",
      errorObj: {},
      oldData: {},
      isLoggedIn: req.session.isLoggedIn,
      token: token,
      successMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const postResetPassword = async (req, res) => {
  try {
    console.log("controller working with post");
    const token = req.params.token;
    const { password } = req.body;
    console.log("controller params:", token);

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.render("./auth/forgotPassword", {
        selected: "forgotPassword",
        errorObj: {},
        oldData: {},
        isLoggedIn: req.session.isLoggedIn,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.render("./auth/signin", {
      selected: "signin",
      errorObj: {},
      oldData: {},
      isLoggedIn: req.session.isLoggedIn,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

//forgot password
const getForgotPassword = async (req, res) => {
  res.render("./auth/forgotPassword", {
    selected: "forgotPassword",
    errorObj: {},
    oldData: {},
    isLoggedIn: req.session.isLoggedIn,
  });
  console.log(req.body);
};
//forgot password token generator

const postForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const { errors } = validationResult(req);

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res.render("./auth/forgotPassword", {
        selected: "forgotPassword",
        errorObj: {},
        oldData: {},
        isLoggedIn: req.session.isLoggedIn,
      });
    }

    const resetToken = uuidv4();

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    console.log("user saved", resetToken);
    const resetLink = `http://localhost:3000/resetPassword/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "saipranaysp850@gmail.com",
        pass: "xsmtpsib-26e61f25242505a5b63647db1d9a4f210b90fe390a332c14f589cd57f2b828eb-tdPvwqBIxzJ3MHYT",
      },
    });

    const mailOptions = {
      from: "saipranaysp850@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: ` Dear User <br><br>

      You recently requested to reset your password for your P-Store account.<br> To reset your password, click the link below:<br><br>
      
      <a href="${resetLink}">Reset Password</a> <br><br>

      If you did not request this password reset, please disregard this message. <br><br>
      
      If you have any questions or need assistance, please contact our support team at saipranaysp850@gmail.com.<br><br>
      
      Thank you, <br><br>
      P-Store Team`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.render("./auth/forgotPassword", {
      selected: "forgotPassword",
      errorObj: {},
      oldData: {},
      isLoggedIn: req.session.isLoggedIn,
    });

    console.log("mailsent", resetLink, resetToken);
  } catch (error) {
    console.log(error);
    res.render("./auth/forgotPassword", {
      selected: "forgotPassword",
      errorObj: {},
      oldData: {},
      isLoggedIn: req.session.isLoggedIn,
    });
  }
};

module.exports = {
  getSignup,
  postSignUp,
  getsignIn,
  postsignIn,
  getSignOut,
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword,
};
