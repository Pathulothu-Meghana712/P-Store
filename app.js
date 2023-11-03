require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const user = require("./models/userModel");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/authRoute");
const shoppingRoutes = require("./routes/shoppingRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const sellRoutes = require("./routes/sellRoute");
const userRoute = require("./routes/userRoute");



// Express app
const app = express();

// Middleware (1) Using body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "static")));

// EJS setup
app.set("view engine", "ejs");
const allViews = path.join(__dirname, "views");
app.set("views", allViews);

// Using express-session & DB Store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // console.log("SESSION IS ", req.session);
  // Skip authentication check for static files
  if (/\.(css|js|jpg|jpeg|png|gif|svg|ico)$/i.test(req.url)) {
    return next();
  }
  // Syncing ID into req object
  user
    .findById(req.session.user._id)
    .then((user) => {
      req.session.user = user;
      next();
    })
    .catch((e) => console.log(e));
});

// Routes
app.use(authRoutes);
app.use(shoppingRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(sellRoutes);
app.use(userRoute);

mongoose
  .connect(`${process.env.MONGO_URI}/?retryWrites=true&w=majority`)
  .then(async () => {
    console.log("Successfully connected to database");
    mongoose.set("debug", false); //Stop mongoose to console.log the queries
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("App started on port 3000");
    });
  })
  .catch((e) => {
    console.log("Error in connecting to DB", e);
  });

