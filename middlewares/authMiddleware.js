const authMiddleWare = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/signin");
  }
next();
};


module.exports = { authMiddleWare };